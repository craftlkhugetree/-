import { Component, OnInit , ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { STColumn, STPage, STComponent } from '@delon/abc';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as XLSX from 'xlsx';
import { NzMessageService, NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-exceltxt',
  templateUrl: './exceltxt.component.html',
  styleUrls: ['./exceltxt.component.css']
})
export class ExceltxtComponent  {
// export class ExceltxtComponent implements AfterViewInit, OnDestroy {
  private mylist;
  private destroy$ = new Subject();
  @ViewChild('st', { static: false }) st: STComponent;
  constructor(private msg:NzMessageService) {}

  page: STPage = {
    front: false,
    show: false,
  };
  data: any[] = Array(2000)
    .fill({})
    .map((_item: any, idx: number) => {
      return {
        id: idx + 1,
        mysn: ~~(Math.random() * 100),  //~~的作用是去掉小数部分
      };
    });
  columns: STColumn[] = [
    { title: '编号', index: 'id', width: '150px' },
    { title: '货号', index: 'mysn', width: '250px' }
  ];

  // 上传表格1
  myUploadexcel(e){
    console.log('excel');
    console.log(e);
  }
  // 上传表格2
  // 上传文本1
  myUploadtxt(e){
    console.log('txt');
    console.log(e);
    let fileReader = new FileReader();
    fileReader.onload=()=>{
      console.log("fireReader:",fileReader.result,fileReader);
      this.data=fileReader.result.toString().split(/[\s]+/gm).map((item,idx)=>{ // //修正符:m 将字符串视为多行,不管是哪行都能匹配;
        return {
          id: idx + 1,
          mysn: item,
        };
      });
    };
    console.log("data:",this.data)
    // fileReader.readAsText(e.target.files[0], 'utf-8')
    console.log(fileReader.readAsText(e.target.files[0]))
  }
  // 上传文本2
  // 上传表格1
  readExcel(e) {//表格导入
    const files = e.target.files;
    console.log("e,e.target:",e,e.target,files);
    if(files.length<=0){//如果没有文件名
    return false;
    }else if(!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())){
    this.msg.error('上传格式不正确，请上传xls或者xlsx格式');
    return false;
     }
 
    const fileReader = new FileReader();
    fileReader.onload = (ev:any) => {
    try {
        const data = ev.target.result;
        const workbook = XLSX.read(data, {
        type: 'binary'
        });
        const wsname = workbook.SheetNames[0];//取第一张表
        const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]);//生成json表格内容
        console.log("ws,fileReader:",ws,workbook);
        this.mylist = [];//清空接收数据
        //编辑数据
        for(var i= 0;i<ws.length;i++){
        this.mylist.push(ws[i]);
        }
        // 此时得到的是一个内容是对象的数组需要处理
        console.log(this.mylist);
        let arr1=this.mylist.map(_=>Object.values(_)[0]);
        console.log(arr1);
 
    } catch (e) {
      console.log('出错了')
        return false;
    }
    };
    fileReader.readAsBinaryString(files[0]);
}
  // 上传表格2
  // scrollToIndex(index: number): void {
  //   this.st.cdkVirtualScrollViewport.scrollToIndex(index);
  // }

  // ngAfterViewInit(): void {
  //   this.st.cdkVirtualScrollViewport.scrolledIndexChange.pipe(takeUntil(this.destroy$)).subscribe(data => {
  //     console.log('scroll index to', data);
  //   });
  // }

  // ngOnDestroy(): void {
  //   this.destroy$.next();
  //   this.destroy$.complete();
  // }
  ngOnInit(){

  }
}