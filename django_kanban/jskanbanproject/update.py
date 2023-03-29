from django.http import JsonResponse
from jskanbanproject.models import Task, Column
import pdb; #pdb.set_trace()

def boardPosition(request):
    if request.method == 'POST':
        # Extract data
        newPos = int(request.POST.get("data[order]"))
        id = int(request.POST.get("data[id]"))
        # Get position from database
        draggedCol = Column.objects.get(id=id); oldPos = draggedCol.position 
        movedCol = Column.objects.get(position=newPos);
        # Update position
        draggedCol.position = newPos
        movedCol.position = oldPos
        # Save
        draggedCol.save()
        movedCol.save()
    return JsonResponse({"response": "success"})