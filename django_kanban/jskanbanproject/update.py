from django.http import JsonResponse
from jskanbanproject.models import Task, Column
import pdb; #pdb.set_trace()

#** Update boards position
def boardPosition(request):
    if request.method == 'POST':
        # Extract data
        newPos = int(request.POST.get("data[order]"))
        id = int(request.POST.get("data[id]"))
        # Get position from database
        draggedCol = Column.objects.get(id=id); 
        oldPos = draggedCol.position 

        # If we move the column from right to left
        if(oldPos < newPos):
            columns = Column.objects.filter(position__range=(oldPos, newPos))
            sign = -1
        # If we move the column from left to right
        else: # oldPos > newPos
            columns = Column.objects.filter(position__range=(newPos, oldPos))
            sign = 1

        # Update boards position
        for column in columns:
            column.position = column.position + sign
            column.save()
        draggedCol.position = newPos; draggedCol.save()     

                     
    return JsonResponse({"response": "success"})

#** Edit tasks
def editTask(request):
    if request.method == 'POST':
        title = request.POST.get("data[title]")
        id = int(request.POST.get("data[id]"))
        Task.objects.filter(id=id).update(title=title)
    return JsonResponse({"response": "success"})

def tasksPosition(request):
    if request.method == "POST":
        idBoard = int(request.POST.get("data[idBoard]"))
        idTasks = request.POST.getlist('data[idTasks][]')
        
        for id in range(0, len(idTasks)):
            Task.objects.filter(id=idTasks[id]
                                ).update(position=id+1, 
                                         idcol=Column.objects.get(id=idBoard))
