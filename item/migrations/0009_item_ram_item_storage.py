# Generated by Django 5.0.2 on 2024-05-11 18:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("item", "0008_alter_comment_owner_id_alter_item_owner_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="item",
            name="ram",
            field=models.CharField(default="0", max_length=5),
        ),
        migrations.AddField(
            model_name="item",
            name="storage",
            field=models.CharField(default="0", max_length=5),
        ),
    ]
