# Generated by Django 5.0.2 on 2024-05-09 11:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("bidwin", "0013_remove_user_address_remove_user_groups_and_more"),
        ("item", "0008_alter_comment_owner_id_alter_item_owner_and_more"),
    ]

    operations = [
        migrations.DeleteModel(
            name="User",
        ),
    ]
