from tkinter import S
import wikipediaapi
from projects.models import Sentence

wiki_wiki = wikipediaapi.Wikipedia('en')

def get_wiki_page(title, project):
    page = wiki_wiki.page(title)
    summary = page.summary
    sentences = summary.split('.')
    for sentence in sentences:
        if sentence != '':
            Sentence.objects.create(project=project, original_sentence=sentence.strip())


    