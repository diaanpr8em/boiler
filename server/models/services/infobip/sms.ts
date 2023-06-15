
export class SMSAdvancedRequest {
    messages: Message[]

    constructor(messages: Message[]) {
        this.messages = messages
    }
}
export class SMSAdvancedResponse {

}
export class Message {
    destinations: Destination[]
    from: string
    text: string

    constructor(destinations: Destination[], from: string, text: string)
    {
        this.destinations = destinations
        this.from = from
        this.text = text
    }
}
export class Destination {
    to: string[]

    constructor(to: string[])
    {
        this.to = to
    }
}
