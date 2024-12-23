@echo off

python -m venv virtual_env

call virtual_env\Scripts\activate

pip install -r requirements.txt

echo Done.
