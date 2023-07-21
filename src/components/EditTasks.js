'use client'

import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from './ui/dialog'
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'
import { HiOutlineEmojiHappy } from 'react-icons/hi'
import {AiFillEdit} from 'react-icons/ai'
import { Loader2 } from "lucide-react"


function EditTasks({tomorrowTasks, tomDate, date, getTasks, loading, setLoading}) {

    //control the dialog open and clsoe
    const [open, setOpen] = useState(false);

    const [selectedIndex, setSelectedIndex] = useState();
    const [validationErrors, setValidationErrors] = useState({});
    const [requiredMessage, setRequiredMessage] = useState(false);

    const openDialog = (index) => {
        const dialog = document.querySelector(`dialog[id="${index}"]`)
        dialog.showModal()
    }

    const closeDialog = (index) => {
        const dialog = document.querySelector(`dialog[id="${index}"]`)
        dialog.close()
    }

    const [inputFields, setInputFields] = useState([
        {emoji: '', name: '', startTime: '', endTime: ''}
    ])

    const handleEmojiSelect = (index, e) => {
        handleFormChange(index, e); 
        closeDialog(index);
    }

    const handleFormChange = (index, e) => {
        let data = [...inputFields];
        if(e.target) {
            data[index][e.target.name] = e.target.value;
            setInputFields(data);
        }
        else{
            data[index]['emoji'] = e.native;
            setInputFields(data);
        }
        
    }

    const addFields = () => {
        let newField = {emoji: '', name: '', startTime: '', endTime: ''}
        setInputFields([...inputFields, newField])
    }

    const removeFields = ( index ) => {
        let data = [...inputFields];
        data.splice(index, 1)
        setInputFields(data)
    }

    const deleteTasks = async (tomDate) => {
        try {
            const endpoint = `/api/deleteTasks/?date=${tomDate}`
      
            const response = await fetch(endpoint, {
                method: 'DELETE'
            })
              .then( response => response.json() )
              .then( response => {
                  console.log(response)
              })
      
          } catch (error) {
            console.error('Error:', error);
          }
    }

    const validateForm = () => {
        let errors = {};

        // Perform validation for each input field.
        inputFields.forEach((input, index) => {
            if (!input.emoji) {
                errors[`emoji_${index}`] = 'Emoji is required';
            }

            if (!input.name) {
                errors[`name_${index}`] = 'Task Name is required';
            }

            if (!input.startTime) {
                errors[`startTime_${index}`] = 'Start Time is required';
            }

            if (!input.endTime) {
                errors[`endTime_${index}`] = 'End Time is required';
            }
        });

        setValidationErrors(errors);
        if (Object.keys(errors).length === 0) {
            setRequiredMessage(false)
        } else {
            setRequiredMessage(true)
        }

        // Form is valid if there are no error messages.
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e, date) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        await deleteTasks(date);

        const data = {
            date: date,
            tasks: inputFields,
        }
        
        const JSONdata = JSON.stringify(data)

        const endpoint = '/api/addTasks'

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'aplication/json',
            },
            body:  JSONdata,
        }

        const response = await fetch(endpoint, options)
        if(response.status === 200){
            return 'success';
        } else {
            return 'error';
        }
    }

    useEffect(() => {
        setInputFields(tomorrowTasks)
      }, []);

      return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className='ml-4 border-2 rounded-full border-blue-600 text-blue-400 p-1
                hover:bg-blue-600'
                disabled={loading}>
                    <AiFillEdit/>
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-gray-950">
                <DialogHeader>
                <DialogTitle className='text-white'>Set Your Goals for Tomorrow</DialogTitle>
                <DialogDescription className='text-gray-400'>
                    Plan your tasks. Click save when youre done.
                </DialogDescription>
                </DialogHeader>
                <form onSubmit={(e) => {
                    handleSubmit(e, date)
                    .then((res) => {
                        if(res === 'success'){
                            getTasks(); 
                            setOpen(false)
                        }
                    }); 
                    e.preventDefault();
                }}>
                <div className="grid gap-4 py-4">
                <div className="font-bold text-lg text-gray-400">
                    {tomDate}
                </div>
                <div className="grid gap-4 py-4 max-h-[calc(100vh-26rem)] overflow-scroll">
                    {requiredMessage && <p className="text-red-500 text-sm italic">Please fill all the required fields</p>}
                    {inputFields.map((input, index) => {
                        return (
                            <div key={index}>
                                <div className='grid gap-4 py-2 rounded-md bg-gray-800 px-1 pr-16 pl-8 relative text-white'>
                                    <div className='flex justify-between'>
                                        <div className="">
                                            <Button type="button" className={`p-0 rounded-full w-10 h-10 border-2 bg-transparent text-slate-400 ${validationErrors[`emoji_${index}`] && 'border-red-400'}`} onClick={() => {openDialog(index); setSelectedIndex(index)}}>{input.emoji ? <div className='text-xl'>{input.emoji}</div> : <HiOutlineEmojiHappy size='2rem'/>}</Button>
                                            <dialog id={index}>
                                                <div className='flex flex-col'>
                                                    <Picker className="z-10" data={data} previewPosition="none" onEmojiSelect={(e) => handleEmojiSelect(selectedIndex, e)}></Picker>
                                                    <Button type="button" className='mt-2' onClick={() => closeDialog(index)}>Close</Button>
                                                </div>
                                            </dialog>
                                        </div>
                                        <div className="">
                                            <Label htmlFor="name" className="text-right hidden">
                                            Task Name
                                            </Label>
                                            <Input id="name" name="name" value={input.name} className={`col-span-3 ${validationErrors[`name_${index}`] && 'border-red-500'}`} placeholder="Task Name" onChange={e => handleFormChange(index, e)} />
                                        </div>
                                    </div>
                                    <div className='flex justify-between'>
                                        <div className="">
                                            <Label htmlFor="startTime" className="text-right">
                                            Start Time
                                            </Label>
                                            <Input type="time" id="startTime" name="startTime" value={input.startTime} placeholder="Start Time" className={`col-span-3 ${validationErrors[`startTime_${index}`] && 'border-red-500'}`} onChange={e => handleFormChange(index, e)}/>
                                        </div>
                                        <div className="">
                                            <Label htmlFor="endTime" className="text-right">
                                            End Time
                                            </Label>
                                            <Input type="time" id="endTime" name="endTime" value={input.endTime} placeholder="End Time" className={`col-span-3 ${validationErrors[`endTime_${index}`] && 'border-red-500'}`} onChange={e => handleFormChange(index, e)}/>
                                        </div>
                                    </div>  
                                    <Button type="button" className='absolute right-0 top-0 text-black bg-transparent hover:bg-transparent' onClick={() => removeFields(index)}>x</Button>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <Button className='bg-blue-600 hover:bg-blue-500' type="button" onClick={addFields} disabled={loading}>Add Another Task</Button>
                {loading ? (
                    <Button disabled>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving
                  </Button>
                ) : (
                    <Button className='bg-blue-600 hover:bg-blue-500' type="submit" disabled={loading}>Save changes</Button>
                )}
                </div>
                </form>
            </DialogContent>
            </Dialog>
        
        </div>
      )
}

export default EditTasks