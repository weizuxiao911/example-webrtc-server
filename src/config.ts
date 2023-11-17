import * as fs from 'fs'
import * as yaml from 'yaml'

const ENV_CONFIG_FILE = '.env/config.yaml'

const config = {

    async get(props: string): Promise<any> {
        const s = await fs.promises.readFile(ENV_CONFIG_FILE, 'utf-8')
        const json = yaml.parse(s)
        if (!json) {
            return undefined
        }
        const keys = props.split(/\./g).filter((it: string) => it)
        return keys.reduce((obj, k) => {
            if (!obj) {
                return undefined
            }
            return obj[k]
        }, json)
    },

    

}

export default config