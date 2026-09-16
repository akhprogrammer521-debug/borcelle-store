import { useState } from 'react';
import Button from '../../../Components/ui/Button';
import Form from 'react-bootstrap/Form';
import Layout from "../../../Layouts/ProfileLayout/Layout";
import InputGroup from 'react-bootstrap/InputGroup';
import { BsPersonCircle } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { BiMessageDetail } from "react-icons/bi";
import { BsCaretLeftFill } from "react-icons/bs";


const ContactUs = ({ onSendMessage }) => {
    const [validated, setValidated] = useState(false);
    const [isSending, setIsSending] = useState(false);

    const handleSubmit = async (e) => {
        const form = e.currentTarget;
        e.preventDefault();

        if (form.checkValidity() === false) {
            setValidated(true);
            return;
        }

        setValidated(true);
        if (!onSendMessage) return;

        setIsSending(true);
        try {
            await onSendMessage();
        } finally {
            setIsSending(false);
        }
    };

    return (
        <>
            <Layout
                headerProfile={
                    <div className="d-flex align-items-center gap-2">
                            <BsCaretLeftFill size={30} />
                            <span>Contact us page</span>
                    </div>
                }
                bodyProfile={
                    <div className="p-3">
                        <Form noValidate validated={validated} onSubmit={handleSubmit} className="d-flex flex-column gap-3 p-3">
                            <Form.Group className="mb-3" controlId="formGroupNamr">
                                <InputGroup className="contact-input-group">
                                    <Form.Control
                                        type="text"
                                        placeholder="Name..."
                                        className="border-end-0"
                                    />

                                    <InputGroup.Text className="contact-icon border bg-white">
                                        <BsPersonCircle size={25} className="icon-cus" />
                                    </InputGroup.Text>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                <InputGroup className="contact-input-group">
                                    <Form.Control
                                        type="text"
                                        placeholder="Email"
                                        className="border-end-0"
                                    />

                                    <InputGroup.Text className="contact-icon border bg-white">
                                        <AiOutlineMail size={25} className="icon-cus" />
                                    </InputGroup.Text>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <InputGroup className="contact-input-group">
                                    <Form.Control as="textarea" rows={3} placeholder="Write message" className="p-3 border-end-0" />
                                    <InputGroup.Text className="contact-icon border bg-white d-flex align-items-start">
                                        <BiMessageDetail size={25} className="icon-cus" />
                                    </InputGroup.Text>
                                </InputGroup>
                            </Form.Group>
                            <Button
                                type="submit"
                                value="Send"
                                isLoading={isSending}
                                loadingLabel="Sending message"
                            />
                        </Form>
                    </div>
                }
            />
        </>
    )
}

export default ContactUs
