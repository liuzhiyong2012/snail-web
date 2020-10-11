<template>
	<div class="scan-ctn">
		<div class="header-ctn">
			<i class="icon  icon-back"></i>
			scan
		</div>

		<div class="content-ctn">
			<!-- 摄像头状态 -->
			<div class="scan-content-ctn camera-ctn" v-show="pageStatus == 'cameraInput'">
				<div class="camera-select-ctn">
					<div  v-for="(item, index) in cameraList" :key="index" @click="selectCamera(item)" class="camera-item">{{ item.label }}</div>
				</div>

				<div @click="getCameraList()">
					<!-- aaaaaa -->
					获取摄像头列表
				</div>

				<div>{{ consoleTxt }}</div>
				<div>{{ cameraErrorTxt }}</div>
			</div>

			<!-- 拍照获取状态 -->
			<div v-show="pageStatus == 'fileInput'" ref="fileCtn" class="scan-content-ctn file-ctn">
				<!-- <canvas ref="fileCanvas" width="" height=""></canvas>-->
				<!-- <i</image>-->
				<input ref="fileInput" accept="image/*" type="file" @change="selectFile($event)" />
			</div>
		</div>
		<div class="footer-ctn">
			<!-- pageStatus = 'cameraInput'  pageStatus = 'fileInput' -->
			<div v-show="pageStatus == 'fileInput'" class="swtich-ctn" @click="switchTo('cameraInput')">
				<div class="swtich-img"></div>
				<p class="swtich-txt">摄像头扫描</p>
			</div>
			<div v-show="pageStatus == 'cameraInput'" class="swtich-ctn" @click="switchTo('fileInput')">
				<div class="swtich-img"></div>
				<p class="swtich-txt">拍照扫描</p>
			</div>
		</div>
	</div>
</template>

<i18n>
	{
		"zh":{
			"title":"新闻"
		},
		"en":{
			"title":"News"
		}
	}
</i18n>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import QrcodeScaner from './js/html5-qr-code.js';

@Component({
	name: 'ScanIndex',
	components: {}
})
export default class ScanIndex extends Vue {
	private bannerData: any = [];
	private pageStatus: string = 'cameraInput'; //'cameraInput','fileInput'
	private html5Qrcode: any = null; //'cameraInput','fileInput'

	private cameraErrorTxt: any = '';

	private cameraList: Array<any> = [
		{
			id: '123456',
			label: '摄像头1'
		},
		{
			id: '123456',
			label: '摄像头2'
		},
		{
			id: '1234563',
			label: '摄像头3'
		},
		{
			id: '1234563',
			label: '摄像头3'
		}
	];

	private consoleTxt: any = '';

	//this.html5Qrcode = new Html5Qrcode(this.__getScanRegionId(), this.verbose)
	private created() {
		// debugger;
		this.html5Qrcode = new QrcodeScaner.Html5Qrcode();
		// debugger;
	}

	private mounted() {}

	private destroyed() {}

	private selectCamera(camera) {
		
			/*	f.disabled = !0, n.disabled = !0, c._showHideScanTypeSwapLink(!1);*/
				var b = {
						fps: 10,
						qrbox: 250
					},
					d = camera.id;
				
				
				this.html5Qrcode.start(camera.value, {fps: 10,
						qrbox: 250},(res)=>{
							console.log('扫描成功!');
						}, (res)=>{
							console.log('扫描失败!');
						}).then(function() {
				/*	o.disabled = !1, o.style.display = "inline-block", n.style.display = "none", c.__setStatus("Scanning")*/
				}).catch(function(b) {
/*					c._showHideScanTypeSwapLink(!0), f.disabled = !1, n.disabled = !1, c.__setStatus("IDLE"), c.__setHeaderMessage(b, a.STATUS_WARNING)
*/				})
			
			
		/* this.pageStatus = pageStatus; */
	}

	private switchTo(pageStatus) {
		this.pageStatus = pageStatus;
	}

	private selectFile(e) {
		let files = e.target.files || e.dataTransfer.files,
			firstFile;

		firstFile = files[0];

		if (!files.length) return;

		this.html5Qrcode.scanFile(firstFile, this.$refs.fileCtn, this.$refs.fileCanvas).then(res => {
			/*	debugger;*/
		});
	}

	private getCameraList() {
		debugger;
		//Html5Qrcode.getCameras().t
		QrcodeScaner.Html5Qrcode.getCameras()
			.then((res: any) => {
				//debugger;
				this.consoleTxt = JSON.parse(JSON.stringify(res));
				console.log('摄像头列表:' + JSON.parse(JSON.stringify(res)));
			})
			.catch(error => {
				this.cameraErrorTxt = error;
				this.cameraList = [
					{
						id: '123456',
						label: '摄像头1'
					},
					{
						id: '123456',
						label: '摄像头2'
					},
					{
						id: '1234563',
						label: '摄像头3'
					}
				];
				console.log(error);
			});
	}

	private selectFile1(e) {
		/* 
    const THIS = this;
    let files = e.target.files || e.dataTransfer.files,
      firstFile;
  
    firstFile = files[0];
  
    if (!files.length) return;
    let reader = new FileReader(),
      image = new Image();
  
    //判断是否为git图片
    let reg = /\.(png|jpg|jpeg)$/;
  
    if (!reg.test(files[0].name)) {
      this.$showWarning('仅支持png,jpg,jpeg的文件类型');
      return;
    }
  
    reader.readAsDataURL(files[0]);
    reader.onloadend = function(f) {
      let base64Url = f.target.result,
        image = new Image();
  
      image.onload = function() {
        let newItem = {
          image: {
            oriImg: {
              url: base64Url,
              width: image.width,
              height: image.height
            },
            curImg: {
              url: base64Url,
              width: image.width,
              height: image.height
            }
          },
          subTitle: ''
        };
        if (isAdd) {
          THIS.inputData.itemArr.push(newItem);
        } else {
          //替换
          THIS.inputData.itemArr.splice(index, 1, newItem);
        }
      };
      image.src = base64Url;
    };
  */
	}
}
</script>

<style lang="scss" scoped>
.scan-ctn {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: #000000;

	.header-ctn {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 1rem;

		.icon {
			position: absolute;
			top: 0.3rem;
			left: 0.3rem;

			font-size: 0.32rem;
			color: #ffffff;
		}
	}

	.content-ctn {
		position: absolute;
		width: 100%;
		top: 1rem;
		bottom: 2.5rem;

		.scan-content-ctn {
			&.camera-ctn {
				.camera-select-ctn {
					display: flex;
					align-items: center;
					justify-content: center;
					.camera-item {
						border-radius: 0.16rem;
						margin: 0 0.3rem;
						width: 1.5rem;
						line-height: 0.40rem;
						font-size: 0.24rem;
						color: #ffffff;
						text-align: center;
						background: #00aec7;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
				&.file-ctn {
				}
			}
		}
	}

	.footer-ctn {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 2.5rem;

		.swtich-ctn {
			text-align: center;
			.swtich-img {
				margin: auto;
				border-radius: 50%;
				width: 0.75rem;
				height: 0.75rem;
				background: #00aec7;
				margin-bottom: 0.2rem;
			}
			.swtich-txt {
				height: 0.3rem;
				font-size: 0.24rem;
				font-family: Helvetica;
				color: #ffffff;
				line-height: 0.3rem;
			}
		}
	}
}
</style>
