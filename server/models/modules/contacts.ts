import { Contacts } from "@prisma/client"

export class ContactsSearchResponse {
    page: number = 0
    rows: number = 10
    total: number = 0
    records: Contacts[] = []

    constructor(data?: ContactsSearchResponse) {
        if (data) {
            Object.assign(this, data)
            return
        }
    }
}