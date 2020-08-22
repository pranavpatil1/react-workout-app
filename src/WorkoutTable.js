import React, {useState, useEffect} from 'react';
import './WorkoutTable.css'
import { ReactSortable } from "react-sortablejs";
import { Trash } from 'react-bootstrap-icons';

    const WorkoutTableBody = (props) => {
        const [list, setList] = useState(null);

        const toString = (row) => {
            var name;
            if (row.isRepeat) {
                name = row.name + ". Repeat x" + row.number;
            } else if (!row.isRest) {
                name = row.name;
                if (row.isTime) {
                    name += ". " + row.number + " seconds";
                } else {
                    name += ". " + row.number + " reps";
                }
                if (row.desc !== "") {
                    name += ". " + row.desc;
                }
            } else {
                name = "Rest. " + row.number + " seconds";
            }
            return name;
        }

        useEffect(() => {
            var parsed = [];
            var row, name;
            for (var index = 0; index < props.workoutData.data.length; index ++) {
                row = props.workoutData.data[index];
                name = toString(row);
                if (row.children === 0) {
                    parsed.push({
                        "id": index,
                        "name": name,
                        "info": row,
                        "subList": null
                    });
                } else {
                    var endChild = index + row.children; // this index is the last child
                    // remember, this is a reference
                    var subList = [];
                    parsed.push({
                        "id": index,
                        "name": name,
                        "info": row,
                        "subList": subList
                    });
                    while (index < endChild) {
                        row = props.workoutData.data[index];
                        name = toString(row);
                        index ++;
                        subList.push({
                            "id": index,
                            "name": name,
                            "info": row,
                            "subList": null
                        });
                    }
                }
            }
            setList(parsed);
        }, [props.workoutData.data]);

        if (list === null) {
            return <div id="viewList"></div>
        }

        return (
            <div id="viewList">
                <ReactSortable 
                    list={list} 
                    setList={(list) => {setList(list); var a=list.filter(x => x.chosen); if (a.length > 0) console.log(a[0].name)}}
                >
                    {list.map(item => {
                        if (item.subList === null) {
                            return (
                                <div key={item.id}>
                                    {item.name}
                                    <Trash />
                                </div>
                            );
                        } else {
                            return (
                                <ReactSortable 
                                    list={item.subList} 
                                    setList={(list) => {item.subList = list;}}
                                >
                                    {item.subList.map(item => {
                                        return (
                                            <div key={item.id}>
                                                {item.name}
                                                <Trash />
                                            </div>
                                        );
                                    })}
                                </ReactSortable>
                            );
                        }
                        
                    })}
                </ReactSortable>
            </div>
        );
    }

const WorkoutTable = (props) => {
    const { workoutData } = props

    if (workoutData !== null) {
        return (
              <WorkoutTableBody 
                  workoutData={workoutData}
              />
          )
    } else {
        return <div></div>;
    }
    
}

export default WorkoutTable