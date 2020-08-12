export default class FlightSeatMatrix{
	
	private  layoutInfo:any ={};
	
	constructor(seatArr:Array<any>){
		
		this.calcSeatArr(seatArr);
		
		/* let a = {
			row:12,
			column:12,
			section:{
				count:3,
				1:{
					startRow:1,
					endRow:12,
					rowCount:12
					columnCount:3,
					column:{
						count:3,
						1:{
							start:1
						}
					}
				}
			},
			section:{
				
			},
			layout:{
				1:{},
				2:{}
			}
		} */
	}
	
	calcSeatArr(seatArr){
	/* 	let section = {
			max:0
		} */
		
		// let layout = [];
		// let sectionArr = [];
		// let section = [];
		// let sectionIndex = 0;
		// let row = [];
		// let rowIndex = 0;
		// let col = [];
		// let colIndex = 0;
		
		/* Name: "1A",
		UserId: "8f7288d9d6fe403f9ee2fad9f46285d7",
		col: 1,
		col-number: 1,
		id: "1",
		row: 1 */
		/* let map = {
			
		}; */
		// let lastRowIndex = 0;
		
		// let sectionIndex = 0;
		let seatMap = {};
		// debugger;
		seatArr.forEach((item,index)=>{
			if(!seatMap[item.row]){
				seatMap[item.row] = {};
			}
			
			if(!seatMap[item.row][item.col]){
				seatMap[item.row][item.col] = [];
			}
			
			seatMap[item.row][item.col].push(item);
			/* if(item.row - lastRowIndex > 1){
				sectionIndex 
			} */
			
			
			/* if(index == 0){
				sectionIndex = 1
			} */
			
			//如果是新的一行
			/* if(row != item.row&&row != 0){
				layout.push(section);
				section = [];
			}
			
			if(colIndex != item.col){
				
			} */
			
			
		
			//如果是最后一个元素
			/* if(index == this.seatArr.length - 1){
				layout.push(section);
			} */
		});
		
		//层级
		let layout = [];
		let rowKeys = Object.keys(seatMap);
		let sectionArr = [];
		let lastRowKey = 0;
		
		// {}
		
		rowKeys.forEach((rowKey,rowIndex)=>{
			rowKey = Number(rowKey);
			if(rowKey - lastRowKey >1&&lastRowKey!=0){
				layout.push(sectionArr);
				sectionArr = [];
			}
			lastRowKey = rowKey;
			let colKeys = Object.keys(seatMap[rowKey]); 
			
			let rowArr = [];
			colKeys.forEach((colKey,colIndex)=>{
				rowArr.push(seatMap[rowKey][colKey]);
			});
			
			sectionArr.push(rowArr);
			
			
			if(rowIndex == rowKeys.length -1){
				layout.push(sectionArr);
			}
		});
		
		// debugger;
		
		
	}
	
	 
	
}