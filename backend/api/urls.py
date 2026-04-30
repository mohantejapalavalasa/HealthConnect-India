from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import register, login, HealthRecordViewSet, DocumentViewSet, PermissionViewSet, list_professionals, toggle_permission, AppointmentViewSet

router = DefaultRouter()
router.register(r'records', HealthRecordViewSet, basename='records')
router.register(r'documents', DocumentViewSet, basename='documents')
router.register(r'permissions', PermissionViewSet, basename='permissions')
router.register(r'appointments', AppointmentViewSet, basename='appointments')

urlpatterns = [
    path('auth/register/', register, name='register'),
    path('auth/login/', login, name='login'),
    path('professionals/', list_professionals, name='list_professionals'),
    path('permissions/toggle/', toggle_permission, name='toggle_permission'),
    path('', include(router.urls)),
]
