import { createRouter, defineEventHandler, useBase } from 'h3'
import { v1 } from '../../../bll/integrations/sms/simple'
const router = createRouter()

router.get('/simple', v1.getSmsSimple)
router.post('/simple', v1.postSmsSimple)

export default useBase('/api/v1/sms', router.handler)