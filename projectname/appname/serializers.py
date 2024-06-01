from rest_framework import serializers
from .models import User1, Jobdetail

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User1
        fields = '__all__'

    
class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User1
        fields = ['email','usertype']  
         
class JobDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model=Jobdetail
        fields='__all__'


