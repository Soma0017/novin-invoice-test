class Invoice {
    customerName: string;
    issueDate: any;
    dueDate: any;
    itemName: string;
    comment: string;
    price: number;

    constructor(
        arg: any
    ) {
        this.customerName = arg.customerName
        this.issueDate = arg.issueDate
        this.dueDate = arg.dueDate
        this.itemName = arg.itemName
        this.comment = arg.comment
        this.price = arg.price
    }

}

export default Invoice
