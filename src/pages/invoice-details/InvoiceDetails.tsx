import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from "react-router-dom";
import './InvoiceDetails.css'
import { db } from "../../firebase.config"
import { getDoc, doc } from "firebase/firestore";
import Invoice from 'classes/Invoice';
import Loading from 'components/loading/Loading';

export default function InvoiceDetails() {
    const location = useLocation();
    const invoiceId = location.state.id;

    const [currentInvoice, setCurrentInvoice] = useState<Invoice>();

    useEffect(() => {
        const invoiceRef = doc(db, "invoices", invoiceId);
        getDoc(invoiceRef).then((invoice) => {
            setCurrentInvoice(invoice.data() as Invoice);
        });
    }, [])

    if (!currentInvoice) {
        return (<Loading />)
    }


    return (
        <div className='invoice-container'>
            <div className='invoice-details'>
                <div className='details-field'>
                    <div className='detail-name'>Vásárló neve</div>
                    <div className='detail-value'>{currentInvoice?.customerName}</div>
                </div>
                <div className='details-field'>
                    <div className='detail-name'>Kiállítás dátuma</div>
                    <div className='detail-value'>{currentInvoice?.issueDate.toDate().toISOString().split('T')[0]}</div>
                </div>
                <div className='details-field'>
                    <div className='detail-name'>Esedékesség dátuma</div>
                    <div className='detail-value'>{currentInvoice?.dueDate.toDate().toISOString().split('T')[0]}</div>
                </div>
                <div className='details-field'>
                    <div className='detail-name'>Tétel neve</div>
                    <div className='detail-value'>{currentInvoice?.itemName}</div>
                </div>
                <div className='details-field comment'>
                    <div className='detail-name'>Komment</div>
                    <div className='detail-value'>{currentInvoice?.comment}</div>
                </div>
                <div className='details-field price'>
                    <div className='detail-value'>{currentInvoice?.price} Ft</div>
                </div>
            </div>
            <div className='buttons'>
                <NavLink to={"/invoices"} className="back-button">Vissza</NavLink>
            </div>
        </div>
    )
}
