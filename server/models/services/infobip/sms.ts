export type SMSAdvancedMessage = {
    messages: Message[]
}

type Message = {
    destinations: Destination[],
    from: string,
    text: string,
}

type Destination = {
    to: string
}