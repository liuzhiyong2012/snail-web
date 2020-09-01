export default class FlightSeatMatrix{
	
	private  layoutInfo:any ={};
	
	constructor(seatArr:Array<any>){
		this.calcSeatArr(seatArr);
	}
	
	calcSeatArr(seatArr){
		let layoutInfo:any = {
			seatType:{
				valueArr:[],
				valueToName:{
					
				}
			},
			seatTypeRow:{
				
			},
		    
			sectionMap:{
				
			},
			seatTypeMap:{
				
			},
			userSeatTypeMap:{
				
			}
			
		}
		
		seatArr.forEach((item,index)=>{
			if(item.UserId){
				layoutInfo.userSeatTypeMap[item.UserId] = item.seatType;
			}
			
			
			if(!layoutInfo.seatType.valueToName[item.seatType]){
				layoutInfo.seatType.valueToName[item.seatType] = '座位类型' + item.seatType;
				layoutInfo.seatType.valueArr.push(item.seatType);
				
				layoutInfo.seatTypeMap[item.seatType] = {};
				// layoutInfo.seatTypeUserMap[item.seatType] = {};
				
				layoutInfo.seatTypeRow[item.seatType] = [];
			}
			
			if(!layoutInfo.sectionMap[item.seatType]){
				layoutInfo.sectionMap[item.seatType] = {};
			}
			if(!layoutInfo.sectionMap[item.seatType][item.row]){
				layoutInfo.sectionMap[item.seatType][item.row] = {};
			}
			if(!layoutInfo.sectionMap[item.seatType][item.row][item.col]){
				layoutInfo.sectionMap[item.seatType][item.row][item.col] = {};
			}
			if(!layoutInfo.sectionMap[item.seatType][item.row][item.col][item['col-number']]){
				layoutInfo.sectionMap[item.seatType][item.row][item.col][item['col-number']] = item;
			}
			
			layoutInfo.seatTypeMap[item.seatType][item.id] = item;
			// layoutInfo.seatTypeUserMap[item.seatType][item.UserId] = item;
		});
	
		let sectionArr = [];
		layoutInfo.seatType.valueArr.forEach((seatType,seatTypeIndex)=>{
			let rowArr = [];
			Object.keys(layoutInfo.sectionMap[seatType]).forEach((row,rowIndex)=>{
				layoutInfo.seatTypeRow[seatType].push(row);
				let rowItem = [];
				Object.keys(layoutInfo.sectionMap[seatType][row]).forEach((col,colIndex)=>{
					let colItem = [];
					Object.keys(layoutInfo.sectionMap[seatType][row][col]).forEach((colNumber,colNumberIndex)=>{
						colItem.push(layoutInfo.sectionMap[seatType][row][col][colNumber]);
					});
					rowItem.push(colItem);
				});
				
				rowArr.push(rowItem);
			});
			sectionArr.push(rowArr);
		});
		
		layoutInfo.sectionArr = sectionArr;
		layoutInfo.maxSeatLen = this.calcMaxSeatLen(layoutInfo);
		// debugger;
		
		this.layoutInfo = layoutInfo;
		
	}
	
	//计算飞机座舱的最大宽度
	calcMaxSeatLen(layoutInfo){
		let seatTypeColumn = {
			'1':1,
			'2':1,
			'3':1
		};
		let layoutSeatLen = 0;
		layoutInfo.sectionArr.forEach((sectionItem,index)=>{
		
			let seactionSeatLen = 0;
			let seatTypeColumnLen = seatTypeColumn[layoutInfo.seatType.valueArr[index]];
			sectionItem.forEach((row,rowIndex)=>{
				
			    let seatCount = 0;
				row.forEach((col,colIndex)=>{
					seatCount = seatCount + col.length;
				});
				
				let rowLen = seatCount + (row.length - 1) * seatTypeColumnLen;  //很重要
				
				if(rowLen > seactionSeatLen){
					seactionSeatLen = rowLen;
				}
			});
			
			if(seactionSeatLen > layoutSeatLen ){
				layoutSeatLen = seactionSeatLen
			}
			
		});
		return layoutSeatLen;
		
	}
	
	
	public getLayoutInfo(){
		return this.layoutInfo;
	}
	
	
	 
	
}