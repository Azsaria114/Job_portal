from django.urls import path
from .views import EmailNOteAPIView, JobDetAPIView, LoginAPIView, SearchAPIView, UserAPIView
urlpatterns = [
        path('adduser/', UserAPIView.as_view(), name='route'),
        path('login/', LoginAPIView.as_view(), name='route'),  
        path('jobdetail/', JobDetAPIView.as_view(), name='route'), 
        path('email/', EmailNOteAPIView.as_view(), name='route'),
        path('search/',SearchAPIView.as_view(),name='route')

]