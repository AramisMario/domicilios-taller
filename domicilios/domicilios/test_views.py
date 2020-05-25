from django.test import TestCase

class LoginTest(TestCase):

    def test_login(self):
        response = self.client.generic('POST','/authregister/signin/',{"email":"aramis@gmail.com","password":"algunapassword"})
        self.assertContains(response,{"mensaje":"No exite el usuario"})
