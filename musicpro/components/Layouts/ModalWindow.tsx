import React, { useEffect, useState } from 'react';
import { Button } from '@paljs/ui/Button';
import { Modal } from 'react-bootstrap';

interface ModalWindowType {
    show: boolean,
    mode: "sm" | "xl" | "lg"
    title: string,
    children: JSX.Element | JSX.Element[],
    readonly: boolean,
    onClose: any,
    onExecute: any
}

export default function ModalWindow({ show, mode, title, children, readonly, onClose, onExecute }: ModalWindowType) {

    return (
        <Modal
            show={show}
            dialogClassName="modal-90w"
            size={mode}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <form autoComplete="off" onSubmit={onExecute}>
                <Modal.Header className='background-primary-light'>
                    <Modal.Title style={{color: 'white'}}>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ marginBottom: '1%' }}>
                    {children}
                </Modal.Body>
                <Modal.Footer>
                    {!readonly && <Button type="submit" shape="Rectangle" status='Success' >Guardar</Button>}
                    <Button type="button" appearance="outline" status='Basic' onClick={() => onClose(false) } >Cerrar</Button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}