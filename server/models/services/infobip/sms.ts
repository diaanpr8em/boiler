
export class SMSAdvancedRequest {
    messages: Message[] | undefined

    constructor(data?: Message[]) {
        if (data) {
            Object.assign(this, data)
            return
        }

        this.messages = []
    }
}
export class SMSAdvancedResponse {

}
export class Message {
    destinations: Destination[] | undefined
    from: string | undefined
    text: string | undefined

    constructor(data?: Message)
    {
        if (data) {
            Object.assign(this, data)
            return
        }

        this.destinations = []
        this.from = ""
        this.text = ""
    }
}
export class Destination {
    to: string[] | undefined

    constructor(data?: Destination)
    {
        if (data) {
            Object.assign(this, data)
            return
        }

        this.to = []
    }
}
