import { createRouter, defineEventHandler, useBase } from 'h3'

const router = createRouter()

const myFunction = () => {
  return "Hello world";
};

router.post('/simple', defineEventHandler(myFunction))

export default useBase('/api/v1/sms', router.handler)