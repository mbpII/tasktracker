import logging
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .models import Task
from .serializers import TaskSerializer

# Set up logging
logger = logging.getLogger(__name__)

class TaskListCreate(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

class TaskRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        logger.debug(f"Deleting task: {instance}")
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)