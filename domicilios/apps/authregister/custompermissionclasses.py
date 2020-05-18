from rest_framework.permissions import BasePermission

class UserPermission(BasePermission):

    def has_permission(self, request, view):
        if request.user.__class__.__name__ != "Usuarios":
            return None
        else:
            return True
