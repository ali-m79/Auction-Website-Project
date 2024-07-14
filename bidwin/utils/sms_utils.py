import requests


def send_verification_sms(mobile_number, template_id, parameters):
    url = "https://api.sms.ir/v1/send/verify"
    headers = {
        "Content-Type": "application/json",
        "X-API-KEY": "PFZsp1bKYveqWj9eDu5Rpl7EOBX4n3Sha8BegnfjagytkcbTJUannLniIIkeavcb"  # API for sms.ir
    }
    data = {
        "Mobile": mobile_number,
        "TemplateId": template_id,
        "Parameters": parameters
    }

    response = requests.post(url, headers=headers, json=data)

    if response.status_code == 200:
        return response.json()
    else:
        return None
