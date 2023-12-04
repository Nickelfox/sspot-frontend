/*eslint no-extra-boolean-cast: ["error", {"enforceForLogicalOperands": true}]*/
/*eslint-disable no-unused-vars */

import { DragSource } from "react-dnd"
import { ViewType, DATETIME_FORMAT } from "./index"
import { DnDTypes } from "./DnDTypes"

export default class DnDSource {
  constructor(resolveDragObjFunc, DecoratedComponent, DnDEnabled, dndType = DnDTypes.EVENT) {
    this.resolveDragObjFunc = resolveDragObjFunc
    this.DecoratedComponent = DecoratedComponent
    this.dndType = dndType
    this.dragSource = DnDEnabled
      ? DragSource(this.dndType, this.getDragSpec(), this.getDragCollect)(this.DecoratedComponent)
      : this.DecoratedComponent
  }

  getDragSpec = () => {
    return {
      beginDrag: (props, monitor, component) => {
        return this.resolveDragObjFunc(props)
      },
      endDrag: (props, monitor, component) => {
        if (!monitor.didDrop()) return

        const { moveEvent, newEvent, schedulerData } = props
        const { events, config, viewType, localeDayjs } = schedulerData
        const item = monitor.getItem()
        const type = monitor.getItemType()
        const dropResult = monitor.getDropResult()
        let slotId = dropResult.slotId,
          slotName = dropResult.slotName
        let newStart = dropResult.start,
          newEnd = dropResult.end
        let initialStart = dropResult.initialStart,
          initialEnd = dropResult.initialEnd
        let action = "New"

        let isEvent = type === DnDTypes.EVENT
        if (isEvent) {
          const event = item
          if (config.relativeMove) {
            newStart = localeDayjs(event.start)
              .add(localeDayjs(newStart).diff(localeDayjs(new Date(initialStart))), "ms")
              .format(DATETIME_FORMAT)
          } else {
            if (viewType !== ViewType.Day) {
              let tmpDayjs = localeDayjs(newStart)
              newStart = localeDayjs(event.start)
                .year(tmpDayjs.year())
                .month(tmpDayjs.month())
                .date(tmpDayjs.date())
                .format(DATETIME_FORMAT)
            }
          }
          newEnd = localeDayjs(newStart)
            .add(localeDayjs(event.end).diff(localeDayjs(event.start)), "ms")
            .format(DATETIME_FORMAT)

          //if crossResourceMove disabled, slot returns old value
          if (config.crossResourceMove === false) {
            slotId = schedulerData._getEventSlotId(item)
            slotName = undefined
            let slot = schedulerData.getSlotById(slotId)
            let slotCheck = !!slot
            if (slotCheck) slotName = slot.name
          }

          action = "Move"
        }

        let hasConflict = false
        if (config.checkConflict) {
          let start = localeDayjs(newStart),
            end = localeDayjs(newEnd)

          events.forEach((e) => {
            if (schedulerData._getEventSlotId(e) === slotId && (!isEvent || e.id !== item.id)) {
              let eStart = localeDayjs(e.start),
                eEnd = localeDayjs(e.end)
              if (
                (start >= eStart && start < eEnd) ||
                (end > eStart && end <= eEnd) ||
                (eStart >= start && eStart < end) ||
                (eEnd > start && eEnd <= end)
              )
                hasConflict = true
            }
          })
        }

        if (hasConflict) {
          const { conflictOccurred } = props
          if (conflictOccurred != undefined) {
            conflictOccurred(schedulerData, action, item, type, slotId, slotName, newStart, newEnd)
          } else {
            console.log("Conflict occurred, set conflictOccurred func in Scheduler to handle it")
          }
        } else {
          if (isEvent) {
            if (moveEvent !== undefined) {
              moveEvent(schedulerData, item, slotId, slotName, newStart, newEnd)
            }
          } else {
            if (newEvent !== undefined)
              newEvent(schedulerData, slotId, slotName, newStart, newEnd, type, item)
          }
        }
      },

      canDrag: (props) => {
        const { schedulerData, resourceEvents } = props
        const item = this.resolveDragObjFunc(props)
        if (schedulerData._isResizing()) return false
        const { config } = schedulerData
        return (
          config.movable &&
          (resourceEvents == undefined || !resourceEvents.groupOnly) &&
          (item.movable == undefined || item.movable !== false)
        )
      }
    }
  }

  getDragCollect = (connect, monitor) => {
    return {
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
      connectDragPreview: connect.dragPreview()
    }
  }

  getDragSource = () => {
    return this.dragSource
  }
}
