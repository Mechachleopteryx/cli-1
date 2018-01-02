import * as execa from 'execa'
import * as path from 'path'

const bin = path.join(__dirname, '../bin/run')

function run(args: string[]) {
  return execa(bin, args)
}

jest.setTimeout(60000)

test('heroku version', async () => {
  const { stdout } = await run(['version'])
  expect(stdout).toMatch(/^heroku-cli\//)
})

test('heroku help', async () => {
  const { stdout } = await run(['help'])
  expect(stdout).toMatch(/^Usage: heroku COMMAND/)
})

test('heroku auth:whoami', async () => {
  const { stdout } = await run(['help'])
  expect(stdout).toMatch(/^Usage: heroku COMMAND/)
})

test('heroku apps && heroku apps info && heroku run', async () => {
  let cmd = await run(['apps'])
  expect(cmd.stdout).toMatch(/^===.*Apps/)
  let app = cmd.stdout.split('\n')[1]
  if (!app) throw new Error(`no app found, got ${cmd.stdout}`)
  app = app.split(' ')[0]
  const appFlag = `-a=${app}`
  expect((await run(['info', appFlag])).stdout).toContain(`=== ${app}`)
  expect((await run(['run', '--exit-code', appFlag, 'echo', 'it works!'])).stdout).toMatch(/^it works!/)
})