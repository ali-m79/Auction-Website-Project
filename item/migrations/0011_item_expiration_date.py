# Generated by Django 5.0.2 on 2024-05-14 11:03

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("item", "0010_alter_comment_owner_id_alter_participate_owner_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="item",
            name="expiration_date",
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
