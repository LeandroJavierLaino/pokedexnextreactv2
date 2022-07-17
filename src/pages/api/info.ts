import type { NextApiRequest, NextApiResponse } from 'next'
import { env } from 'process'
import { version, name } from '../../../package.json'

type Data = {
  name: string
  environment: string
  version: string
}

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({
    name,
    environment: env.NODE_ENV,
    version,
  })
}
