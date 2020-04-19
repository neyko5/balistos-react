import React, { FormEvent } from 'react';
import styled from 'styled-components';

import Button from '../common/Button';
import Input from '../common/Input';
import Dropdown from './Dropdown';
import { createPlaylist } from '../../services/firestore.service';

const LabelTitle = styled.div`
    font-weight: 700;
    font-size: 13px;
    color: #3e414c;
    line-height: 24px;
`;

const Label = styled.label`
    margin-bottom: 5px;
    margin-right: 20px;
    width: 100%;
    padding-bottom: 5px;
`;

type Props = {
    setOpen: (window: string) => void;
};

const CreatePlaylist = (props: Props) => {
    const [form, setForm] = React.useState({ title: '', description: '' });

    function handleChange(event: FormEvent<HTMLFormElement>) {
        const target = event.target as HTMLInputElement;
        setForm({ ...form, [target.name]: target.value });
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!form.title.trim() || !form.description.trim()) {
            return;
        }
        createPlaylist(form.title, form.description);
        setForm({
            title: '',
            description: '',
        });
        props.setOpen('');
    }

    return (
        <Dropdown>
            <form onSubmit={handleSubmit}>
                <Label htmlFor="title">
                    <LabelTitle>Title</LabelTitle>
                    <Input
                        type="text"
                        name="title"
                        onChange={handleChange}
                        value={form.title}
                    />
                </Label>
                <Label htmlFor="description">
                    <LabelTitle>Description</LabelTitle>
                    <Input
                        type="text"
                        name="description"
                        onChange={handleChange}
                        value={form.description}
                    />
                </Label>
                <Button type="submit" color="green">
                    Create
                </Button>
            </form>
        </Dropdown>
    );
};

export default CreatePlaylist;
