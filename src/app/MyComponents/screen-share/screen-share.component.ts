import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-screen-share',
  templateUrl: './screen-share.component.html',
  styleUrls: ['./screen-share.component.css']
})
export class ScreenShareComponent{
  screen:any;
  screensrc:MediaStream | undefined;
  booleanArray:boolean[] = [false,false,false];
  audiostream:MediaStream | undefined;
  getCameraStatus($event:MediaStream){
    if(this.screensrc != null)
    this.screensrc?.getTracks().forEach(track=>{
      track.stop();
    });
    this.screensrc = $event;
  }
  buttonValues($event: boolean[]){
    console.log("this is in screen-share"+$event);
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
    if(!this.booleanArray[0]){
      if(this.booleanArray[1]){
        navigator.mediaDevices.getUserMedia({
          video:true
        }).then(stream=>{
          this.screen = document.getElementById("screen");
          this.screensrc = stream;
          console.log("this is screensrc: "+this.screensrc.id);
          this.screen.srcObject = this.screensrc;
        });
      }
      else{
        if(this.screensrc!=null)
        this.screensrc?.getTracks().forEach(track=>{
          track.stop();
        });
      }
    }
  }
}

