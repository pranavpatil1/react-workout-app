import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { serverGetWorkoutById } from '../Firebase'

import p5 from 'p5';

import './RunTimer.css';

class RunTimer extends Component {
    state = {
        redirect: null
    };

    constructor (props) {
        super(props);
        //
        // need a check if the id parameter is not there or the workout doesnt exist
        if (this.props.id == "") {
            this.setState({
                redirect:"/workouts"
            });
            return;
        }

        this.workout = [];
        this.name = "";
        serverGetWorkoutById(this.props.id).then(result => {
            if (result === null) {
                this.setState({
                    redirect:"/workouts"
                });
                return;
            } else {
                console.log(result);
                this.name = result.name;
                var i = 0;
                this.name = result.name;
                while (i < result.data.length) {
                    var element = result.data[i];
                    this.workout.push(element);
                    if (element.isRepeat) {
                        for (var k = 0; k < element.number; k ++) {
                            for (var j = i + 1; j < i + element.children + 1; j ++) {
                                this.workout.push(result.data[j]);
                            }
                        }
                        i += element.children;
                    }
                    i ++;
                }
            }
        });

        // should add some sort of ending slide
        // need a check if the id parameter is not there or the workout doesnt exist
    }

    sketch_canvas (p) {
        // -1 = haven't started
        // 0-end = exercises/repeats
        p.stage = -1;
        p.nextColor = {};
        p.clickTime = -1;
        p.startTime = -1;
        p.timerStart = -1;

        p.popup = false;
        p.popupText = "";
        p.popupHeight = 0;
        
        p.red = {r:240, g:42, b:73};
        p.green = {r:37, g:204, b:73};
        p.blue = {r:66, g:135, b:245};
        p.off_white = {r:240, g:250, b:240};
        p.black = {r:0, g:0, b:0};
        p.white = {r:255, g:255, b:255};
        p.orange = {r:240, g:145, b:62};

        p.transColor = (colorA, colorB, prop) => {
            return p.color(colorA.r + (colorB.r - colorA.r) * prop, 
                colorA.g + (colorB.g - colorA.g) * prop,
                colorA.b + (colorB.b - colorA.b) * prop);
        }
        p.toColor = (colorDict) => {
            return p.color(colorDict.r, colorDict.g, colorDict.b);
        }
        p.getWrapLines = (text, width, size) => {
            var newline = false;
            text = text.split("\n");
            var currLine = 0;
            var total = 1;
            p.textSize(size);
            for (var i in text) {
                newline = false;
                var line = text[i].split(" ");
                for (var j in line) {
                    var word = line[j];
                    currLine += p.textWidth(word);
                    if (currLine > width) {
                        total ++;
                        currLine = p.textWidth(word);
                        newline = true;
                    } else {
                        newline = false;
                    }
                    currLine += p.textWidth(" ");
                }
                if (!newline && i !== text.length - 1) {
                    total ++;
                }
            }
            return total;
        }
        p.vmin = (perc) => {
            var min = window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth;
            return min * perc / 100;
        }
        p.preload = () => {
            // p.font = p.loadFont("/assets/helvectica-neue.otf");
            // p.beep = p.loadSound("/server/beep.mp3");
        }
        p.setup = () => {
            p.createCanvas(window.innerWidth, window.innerHeight);
            p.textFont("Helvetica Neue");
            p.textAlign(p.CENTER, p.CENTER);
            p.noStroke();
        }
        p.draw = () => {
            var mid = {x: window.innerWidth/2, y: window.innerHeight/2};
            var size, time, circSize;
            if (p.stage === -1) {
                p.background(p.toColor(p.green));
                size = p.vmin(77);
                time = 0;
                if (p.clickTime !== -1) {
                    size = size + size/50000 * p.pow(Date.now() - p.clickTime, 2);
                    time = Math.min(p.pow(Date.now() - p.clickTime, 2), 250000);
                }

                p.fill(255);
                if (p.dist(mid.x, mid.y, p.mouseX, p.mouseY) < size/2) {
                    p.fill(p.toColor(p.off_white));
                }
                if (p.clickTime !== -1) {
                    p.fill(p.transColor(p.off_white, p.nextColor, time/250000));
                }
                p.ellipse(mid.x, mid.y, size, size);

                size = p.vmin(19);
                if (p.clickTime !== -1) {
                    size = size - size/50000 * p.pow(Date.now() - p.clickTime, 2);
                    if (size < 0) size = 0;
                    if (Date.now() - p.clickTime > 1000) {
                        p.stage ++;
                        p.clickTime = -1;
                        p.startTime = Date.now();
                        p.timerStart = -1;
                    }
                }

                if (size > 0) {
                    p.textSize(size);
                    p.fill(p.toColor(p.green));
                    p.textAlign(p.CENTER, p.CENTER);
                    p.text("START", mid.x, mid.y);

                    p.fill(255);
                    p.textAlign(p.LEFT, p.TOP);
                    p.textSize(size * 0.4);
                    p.text(p.name, p.vmin(3), p.vmin(2.5));
                }
            } else if (p.stage >= p.workout.length) {
                p.background(p.toColor(p.green));
                p.fill(255);
                p.textSize(p.vmin(10));
                p.textAlign(p.CENTER, p.CENTER);
                p.text("fin", mid.x, mid.y);
            } else {
                var element = p.workout[p.stage];

                // on first transition, needs to include title text
                // on other transitions, the text needs to be in the background
                var bkgrdColor;

                if (element.isRepeat) {
                    size = p.vmin(20);

                    if (Date.now() - p.clickTime < 500) {
                        size *= (1 - Math.pow(Date.now() - p.clickTime, 2)/250000);
                    }

                    // choose a new color like orange. red means stop/end
                    bkgrdColor = p.orange;
                    p.background(p.toColor(bkgrdColor));

                    
                    p.textAlign(p.LEFT, p.TOP);
                    p.fill(255);

                    var circuits = "";
                    
                    if (size > 0) {
                        p.textSize(size * 0.25);
                        for (var i = 0; i < element.children; i ++) {
                            circuits += (i + 1) + ". ";
                            if (p.workout[p.stage + 1 + i].isRest) {
                                circuits += p.workout[p.stage + 1 + i].number + " sec rest";
                            } else {
                                circuits += p.workout[p.stage + 1 + i].name + 
                                    ": " + p.workout[p.stage + 1 + i].number + (p.workout[p.stage + 1 + i].isTime ? " sec" : " reps");
                            }
                            circuits += "\n";
                        }
                        // remove trailing newline
                        circuits = circuits.substr(0, circuits.length - 1);
                        var summaryHeight = p.getWrapLines(circuits, size * 3.3, size * 0.25) * size * 0.25 * 1.23;

                        p.fill(255);
                        p.textAlign(p.LEFT);
                        p.text(circuits, mid.x - size * 0.8, mid.y - summaryHeight / 2, size * 3.3, size * 5);

                        p.textSize(size * 0.3);
                        p.text(element.name, size * 0.1, size * 0.1);

                        p.textAlign(p.RIGHT);
                        p.text(element.number + " repeats", mid.x - size, mid.y - summaryHeight / 2);

                        p.textSize(size * 0.85);
                        if (p.mouseX > mid.x - size * 0.85 && p.mouseX < mid.x + size * 0.85 && p.mouseY > window.innerHeight - size) {
                            p.textSize (size);
                        }
                        p.textAlign(p.CENTER, p.BOTTOM)
                        p.text("GO", mid.x, window.innerHeight - size * 0.1);
                    }

                    p.fill(p.transColor(p.white, p.blue, Math.pow(Date.now() - p.clickTime, 2)/250000));
                    circSize = 0;
                    if (Date.now() - p.clickTime < 500) {
                        circSize = 5 * p.vmin(100) * Math.pow(Date.now() - p.clickTime, 2)/250000;
                    } else if (p.clickTime !== -1) {
                        p.stage ++;
                        
                        p.clickTime = -1;
                        p.timerStart = -1;
                        p.startTime = Date.now();
                        if (p.stage < p.workout.length && p.workout[p.stage].isRest) {
                            p.timerStart = Date.now();
                        }
                        circSize = 5 * p.vmin(100);
                    }

                    if (circSize > 0)
                        p.ellipse(mid.x, window.innerHeight, circSize, circSize);

                } else {                  
                    
                    if (element.isTime) {
                        var timer = element.number;
                        if (p.timerStart !== -1) {
                            timer -= (Date.now() - p.timerStart) / 1000;
                        }

                        var timeLeft = timer * 1000;
                        if (timeLeft < 0 && timeLeft > -500) {
                            // will decrease from blue (1) to red (0)
                            bkgrdColor = p.transColor(p.red, p.blue, (timeLeft + 500)/500);
                        } else if (timeLeft < -500) {
                            bkgrdColor = p.toColor(p.red);
                            if ((timeLeft * -1) % 1000 < 250) {
                                bkgrdColor = p.transColor(p.black, p.red, ((timeLeft * -1) % 1000)/250);
                            }
                        } else {
                            if (timeLeft < 10000 && timeLeft > 9750) {
                                bkgrdColor = p.transColor(p.black, p.blue, (10000 - timeLeft)/250);
                            } else if (timeLeft < 5000 && timeLeft > 4750) {
                                bkgrdColor = p.transColor(p.black, p.blue, (5000 - timeLeft)/250);
                            } else if (timeLeft < 4500 && timeLeft > 4250) {
                                bkgrdColor = p.transColor(p.black, p.blue, (4500 - timeLeft)/250);
                            } else {
                                bkgrdColor = p.toColor(p.blue);
                            }
                        }
                    } else {
                        bkgrdColor = p.toColor(p.blue);
                    }
                    p.background(bkgrdColor);

                    // need glorious transition in :/
                    // actually calculate time when the circle engulfs everything (size/2 > distance to corner)
                    size = p.vmin(20);

                    if (p.clickTime !== -1) {
                        size = size - size/50000 * p.pow(Date.now() - p.clickTime, 2);
                        if (size < 0) size = 0;
                    }

                    if (Date.now() - p.startTime < 500) {
                        size = size * Math.pow(Date.now() - p.startTime, 2)/250000;
                    }

                    if (size > 0) {
                        p.fill(255);
                        p.textAlign(p.LEFT, p.TOP);
                        p.textSize(size * 0.4);
                        if (element.isRest) {
                            p.text("Rest time", size / 5, size / 5);
                        } else {
                            p.text("Exercise: " + element.name, size / 5, size / 5);
                            p.textSize(size * 0.4);
                            // p.text(element.desc, size / 5, size / 5 + size * 0.4);
                            p.textAlign(p.RIGHT, p.BOTTOM);
                            if (element.desc !== "")
                                p.text("?", window.innerWidth - size/10, window.innerHeight - size/10);
                        }
                        p.textSize(size * 0.3);
                        
                        p.textAlign(p.LEFT, p.BOTTOM);
                        var next = "DONE";
                        if (p.stage !== p.workout.length - 1) {
                            if (p.workout[p.stage + 1].isRest) {
                                next = "REST";
                            } else {
                                next = p.workout[p.stage + 1].name;
                            }
                        }
                        p.text("next: " + next, size / 5, window.innerHeight - size / 5);
                        
                    }

                    p.fill(255);

                    if (element.isTime || true) {
                        if (p.dist(mid.x, mid.y, p.mouseX, p.mouseY) < size * 1.75) {
                            p.fill(240);
                        }
                        circSize = p.vmin(20);
                        if (Date.now() - p.startTime < 500) {
                            circSize = circSize * Math.pow(Date.now() - p.startTime, 2)/250000;
                        }
                        if (p.clickTime !== -1) {
                            circSize = circSize + circSize/50000 * p.pow(Date.now() - p.clickTime, 2);
                            p.fill(p.transColor(p.white, p.nextColor, p.pow(Date.now() - p.clickTime, 2)/1000000));
                            
                            if (Date.now() - p.clickTime > 1000) {
                                p.stage ++;
                                p.clickTime = -1;
                                p.timerStart = -1;
                                p.startTime = Date.now();
                                if (p.stage < p.workout.length && p.workout[p.stage].isRest) {
                                    p.timerStart = Date.now();
                                }
                            }
                        }
                        p.ellipse(mid.x, mid.y, circSize * 3.5, circSize * 3.5);
                    }
                    
                    if (size > 0) {
                        p.textSize(size);
                        p.fill(bkgrdColor);
                        if (element.isTime) {
                            p.textAlign(p.CENTER, p.CENTER);
                            if (timer < 0) {
                                if (timer * -1 < p.element) {
                                    // p.text(timer.toFixed(1), mid.x, mid.y);
                                }

                                p.text("STOP", mid.x, mid.y);
                            } else {
                                p.text(timer.toFixed(1), mid.x, mid.y);
                            }
                        } else {
                            p.textAlign(p.CENTER, p.BOTTOM);
                            p.textSize(size * 0.8);
                            p.text(element.number + " reps", mid.x, mid.y + size * 0.1);
                        }
                    } else {
                        p.popup = false;
                    }

                    if (!element.isTime) {
                        p.textSize(size * 0.75);
                        if (p.mouseX > mid.x - size * 0.85 && p.mouseX < mid.x + size * 0.85 && p.mouseY < mid.y + size * 1.0 && p.mouseY > mid.y + size * 0.3) {
                            p.textSize (size * 0.9);
                        }
                        p.textAlign(p.CENTER, p.TOP)
                        p.text("done", mid.x, mid.y + size * 0.3);
                    }

                    if (p.popup) {
                        size = p.vmin(20);
                        p.fill(255, 255, 255, 200);
                        p.textSize(size * 0.25);
                        p.rect(0, window.innerHeight - p.popupHeight, window.innerWidth, p.popupHeight);
                        
                        p.fill(0);
                        p.textAlign(p.LEFT, p.TOP);
                        p.textSize(size * 0.25);
                        p.text(p.popupText[1], size/10, window.innerHeight - p.popupHeight + size/10, window.innerWidth, window.innerHeight/2);
                        p.popupHeight = Math.ceil(p.textWidth(p.popupText[1])/window.innerWidth) * size * 0.25 + size * 0.2;
                    }
                }
                
            }
        }

        p.touchEnded = () => {
            var mid = {x: window.innerWidth/2, y: window.innerHeight/2};
            var size;
            if (p.stage === -1) {
                size = p.vmin(80);
                if (p.dist(mid.x, mid.y, p.mouseX, p.mouseY) < size/2) {
                    p.clickTime = Date.now();
                    if (p.workout.length > 0) {
                        p.nextColor = p.workout[0].isRepeat ? p.orange : p.blue;
                    } else {
                        p.nextColor = p.green;
                    }
                }
            } else if (p.stage < p.workout.length) {
                var element = p.workout[p.stage];
                size = p.vmin(20);
                if (element.isRepeat) {
                    if (p.mouseX > mid.x - size * 0.85 && p.mouseX < mid.x + size * 0.85 && p.mouseY > window.innerHeight - size) {
                        p.clickTime = Date.now();
                        p.nextColor = p.blue;
                    }
                } else {
                    if (element.isTime) {
                        if (p.dist(mid.x, mid.y, p.mouseX, p.mouseY) < size * 1.75) {
                            if (p.timerStart === -1) {
                                p.timerStart = Date.now();
                            } else if (p.timerStart !== -1 && element.number * 1000 - (Date.now() - p.timerStart) < 0) {
                                p.clickTime = Date.now();
                                if (p.stage + 1 < p.workout.length) {
                                    p.nextColor = p.workout[p.stage + 1].isRepeat ? p.orange : p.blue;
                                } else {
                                    p.nextColor = p.green;
                                }
                            }
                        }
                    } else {
                        if (p.mouseX > mid.x - size * 0.85 && p.mouseX < mid.x + size * 0.85 && 
                                p.mouseY < mid.y + size * 1.0 && p.mouseY > mid.y + size * 0.3 &&
                                p.clickTime === -1) {
                            p.clickTime = Date.now();
                            if (p.stage + 1 < p.workout.length) {
                                p.nextColor = p.workout[p.stage + 1].isRepeat ? p.orange : p.blue;
                            } else {
                                p.nextColor = p.green;
                            }
                        }
                    }
                    if (!element.isRest && !element.isRepeat && element.desc !== "") {
                        if (p.mouseX > window.innerWidth - size * 0.5 && p.mouseY > window.innerHeight - size * 0.65) {
                            p.popup = true;
                            p.popupText = [element.name, element.desc];
                        } else if (p.mouseY > p.popupHeight) {
                            p.popup = false;
                        }
                    }
                }
            } else {
                // end page
            }
            return false;
        }
        p.windowResized = () => {
            p.resizeCanvas(window.innerWidth, window.innerHeight);
        }
    }

    componentDidMount () {
        if (!this.state.redirect) {
            var myp5 = new p5(this.sketch_canvas, 'canvas');
            myp5.workout = this.workout;
            myp5.name = this.name;
        }
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
      return (
        <div className="canvas-container" id="canvas"></div>
      );
    }
  }

export default RunTimer;
