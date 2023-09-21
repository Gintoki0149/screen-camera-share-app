import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dualscreen',
  templateUrl: './dualscreen.component.html',
  styleUrls: ['./dualscreen.component.css']
})
export class DualscreenComponent implements OnInit{
  @Input()booleanArray: boolean[] = [false,false,false];
  @Input()screenstream: MediaStream|undefined;
  mainscreen:any;
  subscreen:any;
  audiostream:MediaStream | undefined;
  mainscreenstream:MediaStream | undefined;
  subscreenstream:MediaStream | undefined;
  @Output() buttonDataFromDualScreen = new EventEmitter<boolean []>();
  @Output() cameraStream = new EventEmitter<MediaStream>;
  ngOnInit(): void {
      console.log("this is boolean array in ngoninit: "+this.booleanArray);
      this.mainscreen = document.getElementById("mainscreen");
      this.subscreen = document.getElementById("subscreen");
      this.screenstream?.getTracks().forEach(track=>{
        track.stop();
      });
      this.cameraStream.emit(this.screenstream);
      navigator.mediaDevices.getDisplayMedia({
        video:true
      }).then((stream : any)=>{
        console.log(stream);
        this.mainscreen.srcObject = stream;
        this.mainscreenstream = stream;
        console.log("this is mainscreenstream"+this.mainscreenstream);
        stream.getTracks()[0].onended = ()=>{
          this.booleanArray[0] = false;
          this.buttonDataFromDualScreen.emit(this.booleanArray);
        }
      }).catch(error=>{
        console.log(error);
        console.log("I am from dualscreen");
        this.booleanArray[0] = false;
        this.buttonDataFromDualScreen.emit(this.booleanArray);
      });
      if(this.booleanArray[1]){
        navigator.mediaDevices.getUserMedia({
          video:true
        }).then(stream=>{
          this.subscreenstream = stream;
          this.subscreen.srcObject = this.subscreenstream;
        });
      }
  }
 
  buttonValues($event: boolean[]){
    console.log("buttonpallet to dual screen"+$event);
    this.booleanArray[0] = $event[0];
    this.booleanArray[1] = $event[1];
    this.booleanArray[2] = $event[2];
    if(this.booleanArray[2]){
      navigator.mediaDevices.getUserMedia({audio:true}).then(stream=>{
        this.audiostream = stream;
      }).catch(error=>{
        console.log("could not open mic");
      });
      console.log("audio working");
    }
    else{
      this.audiostream?.getAudioTracks().forEach(track=>{
        track.stop;
      });
      console.log("muted");
    }
    if(this.booleanArray[0] && !this.booleanArray[1]){
      this.mainscreen = document.getElementById("mainscreen");
      this.subscreen = document.getElementById("subscreen");
      this.subscreenstream?.getTracks().forEach(track=>{
        track.stop();
      });
      this.subscreen.srcObject = this.subscreenstream;
    }
    else if(this.booleanArray[0] && this.booleanArray[1]){
      this.subscreen = document.getElementById("subscreen");
      navigator.mediaDevices.getUserMedia({
        video:true
      }).then(stream=>{
        this.subscreenstream = stream;
        this.subscreen.srcObject = this.subscreenstream;
      });
    }
    else if(!this.booleanArray[0] && this.booleanArray[1]){
      console.log("this is mainscreenstream:"+this.mainscreenstream);
      this.mainscreenstream?.getTracks().forEach(track=>{
        track.stop();
      });
      this.subscreenstream?.getTracks().forEach(track=>{
        track.stop();
      });
      this.subscreen.srcObject = this.subscreenstream;
    }
    else{
      console.log("this is mainscreenstream:"+this.mainscreenstream);
      this.mainscreenstream?.getTracks().forEach(track=>{
        track.stop();
      });
      this.subscreenstream?.getTracks().forEach(track=>{
        track.stop();
      });
      this.subscreen.srcObject = this.subscreenstream;
    }
    this.buttonDataFromDualScreen.emit(this.booleanArray);
  }
}
