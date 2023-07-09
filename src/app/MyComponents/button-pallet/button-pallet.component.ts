import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button-pallet',
  templateUrl: './button-pallet.component.html',
  styleUrls: ['./button-pallet.component.css']
})
export class ButtonPalletComponent implements OnInit{
  @Input() booleanArray : boolean [] = [false,false,false];
  @Output() dataFromButtonPallete = new EventEmitter<boolean []>();
  vidClose:String = "../../../assets/camera-video-off-fill.svg"
  vidOpen:String = "../../../assets/camera-video-fill.svg"
  vidStatus:String =this.vidClose;
  audioClose:String = "../../../assets/mic-mute-fill.svg"
  audioOpen:String = "../../../assets/mic-fill.svg"
  audioStatus:String = this.audioClose;
  ngOnInit(): void {
    if(this.booleanArray[1]) this.vidStatus = this.vidOpen; 
    else this.vidStatus = this.vidClose;
    if(this.booleanArray[2]) this.audioStatus = this.audioOpen; 
    else this.audioStatus = this.audioClose;
  }
  presentScreen(){
    this.booleanArray[0] = !this.booleanArray[0];
    this.dataFromButtonPallete.emit(this.booleanArray);
  }
  videoShare(){
    this.booleanArray[1] = !this.booleanArray[1];
    if(this.booleanArray[1]) this.vidStatus = this.vidOpen; 
    else this.vidStatus = this.vidClose;
    this.dataFromButtonPallete.emit(this.booleanArray);
  }
  audioShare(){
    this.booleanArray[2] = !this.booleanArray[2];
    if(this.booleanArray[2]) this.audioStatus = this.audioOpen; 
    else this.audioStatus = this.audioClose;
    this.dataFromButtonPallete.emit(this.booleanArray);
  }
}
