from tkinter import S
from wikipediaapi import Wikipedia
from projects.models import Sentence

wiki_wiki = Wikipedia('en')

def get_wiki_page(title, project):
    page = wiki_wiki.page(title)
    print(page)
    summary = page.summary
    print(summary)
    sentences = summary.split('.')
    for sentence in sentences:
        if sentence != '':
            Sentence.objects.create(project=project, original_sentence=sentence.strip())
