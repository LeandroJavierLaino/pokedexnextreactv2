import moment from 'moment'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  status: string
  timestamp: Date
  uptime: number
}

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res
    .status(200)
    .json({
      uptime: process.uptime(),
      status: 'UP',
      timestamp: moment().toDate(),
    })
}
