# Generated by Django 5.0.2 on 2024-05-16 18:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("bidwin", "0021_alter_account_reference_number"),
    ]

    operations = [
        migrations.AlterField(
            model_name="account",
            name="Reference_Number",
            field=models.CharField(
                blank=True,
                default="dghl7xh8mq",
                editable=False,
                max_length=10,
                unique=True,
            ),
        ),
    ]
