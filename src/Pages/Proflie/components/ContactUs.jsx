import { useState } from 'react';
import Button from '../../../Components/ui/Button';
import Form from 'react-bootstrap/Form';
import Layout from "../../../Layouts/ProfileLayout/Layout";
import InputGroup from 'react-bootstrap/InputGroup';
import { BsPersonCircle } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { BiMessageDetail } from "react-icons/bi";
import { BsCaretLeftFill } from "react-icons/bs";
import { useTranslation } from "react-i18next";


const ContactUs = ({ onSendMessage }) => {
  const { t } = useTranslation();
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
                    <div className="profile-title d-flex align-items-center gap-2">
                            <BsCaretLeftFill size={30} />
                            <span>{t("profile.contactUsPage")}</span>
                    </div>
                }
                bodyProfile={
                    <div className="p-3">
                        <Form noValidate validated={validated} onSubmit={handleSubmit} className="d-flex flex-column gap-3 p-3">
                            <Form.Group className="mb-3" controlId="formGroupNamr">
                                <InputGroup className="contact-input-group">
                                    <Form.Control
                                        type="text"
                                        placeholder={t("profile.name")}
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
                                        placeholder={t("common.email")}
                                        className="border-end-0"
                                    />

                                    <InputGroup.Text className="contact-icon border bg-white">
                                        <AiOutlineMail size={25} className="icon-cus" />
                                    </InputGroup.Text>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <InputGroup className="contact-input-group">
                                    <Form.Control as="textarea" rows={3} placeholder={t("profile.writeMessage")} className="p-3 border-end-0" />
                                    <InputGroup.Text className="contact-icon border bg-white d-flex align-items-start">
                                        <BiMessageDetail size={25} className="icon-cus" />
                                    </InputGroup.Text>
                                </InputGroup>
                            </Form.Group>
                            <Button
                                type="submit"
                                value={t("common.send")}
                                isLoading={isSending}
                                loadingLabel={t("profile.sendingMessage")}
                            />
                        </Form>
                    </div>
                }
            />
        </>
    )
}

export default ContactUs
