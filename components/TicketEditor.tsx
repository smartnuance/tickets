import React from 'react';
import { useForm } from 'react-hook-form';
import { TicketInput } from '../constants/Types';
import FormPage from './layout/FormPage';
import Input from './form/Input';
import Textarea from './form/Textarea';

export default function TicketEditor({
    title,
    ticket,
    onSave,
    isLoading,
    errorMessage,
}: {
    title: string;
    ticket?: Partial<TicketInput> | null;
    onSave: (ticket: TicketInput) => void;
    isLoading: boolean;
    errorMessage?: string;
}) {
    const { register, handleSubmit } = useForm<TicketInput>();

    return (
        <FormPage
            {...{
                title,
                isLoading,
                onSubmit: handleSubmit((ticket) => onSave(ticket)),
                button: !errorMessage ? 'Save' : <></>,
            }}
        >
            {errorMessage ? (
                <p>{errorMessage}</p>
            ) : (
                <>
                    <div className="mb-4 sm:mb-8">
                        <label
                            htmlFor="title"
                            className="block mb-2 text-sm font-medium dark:text-white"
                        >
                            Title
                        </label>
                        <Input
                            id="title"
                            {...register('title')}
                            defaultValue={ticket?.title ?? ''}
                            placeholder="Choose a short and descriptive title"
                            type="text"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="body"
                            className="block mb-2 text-sm font-medium dark:text-white"
                        >
                            Description
                        </label>
                        <div className="mt-1">
                            <Textarea
                                id="body"
                                {...register('body')}
                                defaultValue={ticket?.body ?? ''}
                                placeholder="Write what the task is about"
                                rows={10}
                            />
                        </div>
                    </div>
                </>
            )}
        </FormPage>
    );
}
