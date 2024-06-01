from audioop import error
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .methods import encrypt_password, send_email

from .models import Jobdetail, User1
from .serializers import JobDetailSerializer, LoginSerializer, UserSerializer

class UserAPIView(APIView):

    # Create a new record
    def post(self, request):
        try:
            data = request.data  # Get data from the request
            password=data.get('password')
            encrypted_password=encrypt_password(password)
            serializer = UserSerializer(data=data)  # Send data to serializer
            if serializer.is_valid():  # Check if data is valid
                serializer.save(password=encrypted_password)  # Save the data
                
                return Response({
                    'status': {
                        'code': 1,
                        'status': "User record created successfully"
                    },'data':serializer.data
                }, status=status.HTTP_201_CREATED)
            return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'status': 'Record not created', 'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self,request):
        try:
            data=request.query_params.get('email')
            user=User1.objects.get(email=data)
            serializer=UserSerializer(user)
            return Response({'data':serializer.data,'status':'Record Fetched successfully'},status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'status':'Record not found'},status=status.HTTP_400_BAD_REQUEST)
        

    def put(self,request):
        try:
            data=request.data
            email=data.get('email')
            encrypted_password=encrypt_password(data.get('password'))
            user=User1.objects.get(email=email)
            serializer=UserSerializer(user,data=data)
            if serializer.is_valid():
                serializer.save(password=encrypted_password)
                return Response({'data':serializer.data,'status':'Record updated successfully'},status=status.HTTP_200_OK)
            return Response({'error':serializer.errors},status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'status':'Record not updated'},status=status.HTTP_400_BAD_REQUEST)
    
    


class LoginAPIView(APIView):
    def post(self, request):
        try:
            data = request.data
            
            email = data.get('email')
            password = data.get('password')
            encrypted_password=encrypt_password(password)
            user = User1.objects.get(email=email, password=encrypted_password)
            
            serializer = LoginSerializer(user)
            print('serializer',serializer.data)
            return Response({'data':serializer.data,'status':'Valid user'}, status=status.HTTP_200_OK)
        except User1.DoesNotExist:
            return Response({'status': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

class JobDetAPIView(APIView):
    def post(self,request):
        try:
            data=request.data
            print('data',data)
            serializer=JobDetailSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response({'data':data,'error':serializer.errors,'status':'Record created'},status=status.HTTP_201_CREATED)
            return Response({'error':serializer.errors},status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'status':'Record not created'},status=status.HTTP_400_BAD_REQUEST)
        
        
    def get(self,request):
        try:
            job=Jobdetail.objects.all()
            serializer=JobDetailSerializer(job,many=True)
            return Response({'data':serializer.data,'status':'Record Fetched successfully'},status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'status':'Record not found'},status=status.HTTP_400_BAD_REQUEST)   
    
class EmailNOteAPIView(APIView):
 
    def post(self, request):
        data = request.data
        
        to_email = data.get('to_email', None)
        email_subject = data.get('email_subject', None)
        email_body = data.get('email_body', None)

        try:
            send_email(to_email, email_subject, email_body)
            return Response({'message': ' email sent successfully.',
                                },
                                status=status.HTTP_200_OK)
        except Exception as e:
             print(f"Error sending email: {str(e)}")
             return Response({'message': 'Error sending email.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class SearchAPIView(APIView):
   def get(self,request):
        try:
            data=request.query_params.get('job_name')
            job=Jobdetail.objects.filter(job_name=data)
            serializer=JobDetailSerializer(job,many=True)
            return Response({'data':serializer.data,'status':'Record Fetched successfully'},status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'status':'Record not found'},status=status.HTTP_400_BAD_REQUEST)
        