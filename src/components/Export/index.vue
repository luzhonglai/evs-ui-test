<template>
  <el-button type="primary" plain @click="exportData">导出</el-button>
</template>

<script>
  import { exportExcel } from '@/api/base'

  export default {
    props: {
      name: {
        type: String,
        default: 'download'
      },
      url: {
        type: String,
        default: ''
      },
      reqData: {
        type: Object
      }
    },
    methods: {
      exportData() {
        const req = this.reqData
        const loadingInstance = window.ELEMENT.Loading.service({ fullscreen: false, text: '正在导出', customClass: 'importLoadingClass' })
        exportExcel(req, this.url).then(response => {
          loadingInstance.close()
          const downloadName = this.name + '.xlsx'
          const blobData = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
          // IE
          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blobData, downloadName)
          } else {
            const url = window.URL.createObjectURL(blobData)
            const link = document.createElement('a')
            link.style.display = 'none'
            link.href = url
            link.setAttribute('download', downloadName)
            document.body.appendChild(link)
            link.click()
            link.remove()
          }
        }).catch(() => {
          loadingInstance.close()
        })
      }
    }
  }
</script>

<style lang="sass" scoped>
@deep: ~'>>>';


@{deep} .container {

}
</style>