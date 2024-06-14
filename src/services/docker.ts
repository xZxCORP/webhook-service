import { exec } from 'node:child_process'

export class DockerService {
  public updateService(serviceName: string, imageName: string): Promise<void> {
    return new Promise((resolve, reject) => {
      exec(
        `/usr/bin/docker service update --force ${serviceName} --image ${imageName}`,
        (error, stdout, stderr) => {
          if (error) {
            console.error(`exec error: ${error}`)
            reject(error)
            return
          }
          console.log(`stdout: ${stdout}`)
          console.error(`stderr: ${stderr}`)
          resolve()
        }
      )
    })
  }
}
