import React, { useState } from 'react'
import { Navigate, NavLink, useNavigate } from 'react-router-dom'
import './InvoiceCreate.css'
import { db } from "../../firebase.config"
import { addDoc, collection, query, where, getDocs, getDoc, doc, updateDoc } from "firebase/firestore";
import Invoice from 'classes/Invoice';

export default function InvoiceCreate() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState<any>({
        customerName: '',
        issueDate: '',
        dueDate: '',
        itemName: '',
        comment: '',
        price: '',
    })

    const [formErrors, setFormErrors] = useState<any>({
        customerName: '',
        issueDate: '',
        dueDate: '',
        itemName: '',
        comment: '',
        price: '',
    })

    function handleInputChange(event: any) {
        const value = event.target.value;
        const fieldName = event.target.name;
        setFormData({ ...formData, [fieldName]: value })
        setFormErrors({ ...formErrors, [fieldName]: (value.length == 0 ? "Mező kitöltése kötelező" : "") })
    }

    function fieldsValid() {
        let fieldsValid = true;
        let errors: any = {}
        for (let key in formData) {
            if (formData[key].length == 0) {
                errors[key] = "Mező kitöltése kötelező"
                fieldsValid = false;
            }
        }
        setFormErrors({ ...errors })
        return fieldsValid
    }

    function submitForm(event: any) {
        event.preventDefault();
        if (!fieldsValid()) return;
        const newInvoice: Invoice = new Invoice({
            customerName: formData.customerName,
            issueDate: new Date(formData.issueDate),
            dueDate: new Date(formData.dueDate),
            itemName: formData.itemName,
            comment: formData.comment,
            price: formData.price

        })
        addDoc(collection(db, "invoices"), { ...newInvoice }).then(() => {
            alert("Számla sikeresen hozzáadva");
            navigate('/invoices');
        });
    }

    return (
        <div className='invoice-container'>
            <form className='invoice-form' >
                <h1 className="title">Új számla adatainak megadása</h1>
                <div className='form-field'>
                    <label className='field-label required'>
                        Vásárló neve
                    </label>
                    <div className='field-error'>{formErrors.customerName}</div>
                    <input type="text" id="asd" name="customerName" onChange={(e) => handleInputChange(e)} value={formData.customerName} />
                </div>
                <div className='form-field'>
                    <label className='field-label required'>
                        Kiállítás dátuma
                    </label>
                    <div className='field-error'>{formErrors.issueDate}</div>
                    <input type="date" name='issueDate' onChange={(e) => handleInputChange(e)} value={formData.issueDate} />
                </div>
                <div className='form-field'>
                    <label className='field-label required'>
                        Esedékesség dátuma
                    </label>
                    <div className='field-error'>{formErrors.dueDate}</div>
                    <input type="date" name='dueDate' onChange={(e) => handleInputChange(e)} value={formData.dueDate} />
                </div >
                <div className='form-field'>
                    <label className='field-label required'>
                        Tétel neve
                    </label>
                    <div className='field-error'>{formErrors.itemName}</div>
                    <input type="text" name='itemName' onChange={(e) => handleInputChange(e)} value={formData.itemName} />
                </div >
                <div className='form-field'>
                    <label className='field-label required'>
                        Komment
                    </label>
                    <div className='field-error'>{formErrors.comment}</div>
                    <textarea name='comment' onChange={(e) => handleInputChange(e)} value={formData.comment} />
                </div >
                <div className='form-field'>
                    <label className='field-label required'>
                        Ár
                    </label>
                    <div className='field-error'>{formErrors.price}</div>
                    <input type="number" name='price' onChange={(e) => handleInputChange(e)} value={formData.price} />
                </div >
                <div className='buttons'>
                    <NavLink className="button" to={'/invoices'}>Vissza</NavLink>
                    <button onClick={(e) => submitForm(e)} className="button">Adatok mentése</button>
                </div>
            </form >
        </div >
    )
}
