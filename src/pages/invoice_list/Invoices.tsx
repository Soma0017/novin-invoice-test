import Invoice from "classes/Invoice"
import { useState, useEffect } from "react"
import { db } from "../../firebase.config";
import { collection, query, getDocs } from "firebase/firestore";
import { NavLink, useNavigate } from 'react-router-dom'
import './Invoices.css'
import Loading from "components/loading/Loading";

export default function Invoices() {
    const [invoices, setIncvoices] = useState<any>();
    const navigate = useNavigate();

    useEffect(() => {
        let invoices: any = []
        const invoiceQuery = query(collection(db, "invoices"))
        getDocs(invoiceQuery).then((snapshot) => {
            snapshot.docs.forEach((doc) => {
                let newInvoice: Invoice = doc.data() as Invoice
                invoices.push({
                    id: doc.id,
                    invoice: newInvoice
                })
            })
            setIncvoices([...invoices]);
        })
    }, [])

    if (!invoices) {
        return (<Loading />)
    }

    if (invoices.length === 0) {
        return (
            <div className="invoice-content">
                Nincsenek számlák.
                <NavLink to={"/create-invoice"} className='button'><i className="fa-solid fa-plus"></i><a>Új számla hozzáadása</a></NavLink>
            </div>
        )
    }

    return (
        <div className='invoice-content'>

            <div className='control-row'>
                <NavLink to={"/create-invoice"} className='button'><i className="fa-solid fa-plus"></i><a>Új számla hozzáadása</a></NavLink>
            </div>

            <div className='invoice-table'>
                <div className='header-row'>
                    <div className='header-cell'>Vásárló neve</div>
                    <div className='header-cell'>Kiállítás dátuma</div>
                    <div className='header-cell'>Esedékesség dátuma</div>
                    <div className='header-cell'>Tétel neve</div>
                    <div className='header-cell'>Ár</div>
                </div>
                <div className='table-rows'>
                    {
                        invoices.map((data: any) => {
                            return (
                                <div className='table-row' key={data.id} onClick={() => {
                                    navigate('/invoice-details', {
                                        state: {
                                            id: data.id
                                        }
                                    })
                                }}>
                                    <div className='table-cell'>{data.invoice.customerName}</div>
                                    <div className='table-cell'>{data.invoice.dueDate.toDate().toISOString().split('T')[0]}</div>
                                    <div className='table-cell'>{data.invoice.issueDate.toDate().toISOString().split('T')[0]}</div>
                                    <div className='table-cell'>{data.invoice.itemName}</div>
                                    <div className='table-cell'>{data.invoice.price} Ft</div>
                                </div>
                            )
                        })

                    }
                </div>
            </div>
        </div>
    )
}
