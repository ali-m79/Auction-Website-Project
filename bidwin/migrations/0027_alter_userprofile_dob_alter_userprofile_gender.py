# Generated by Django 5.0.2 on 2024-05-18 19:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("bidwin", "0026_alter_userprofile_image"),
    ]

    operations = [
        migrations.AlterField(
            model_name="userprofile",
            name="dob",
            field=models.CharField(max_length=15, null=True),
        ),
        migrations.AlterField(
            model_name="userprofile",
            name="gender",
            field=models.CharField(max_length=15, null=True),
        ),
    ]
