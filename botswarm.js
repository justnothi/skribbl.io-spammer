

var nl = getNewLine()

function getNewLine() {
	var agent = navigator.userAgent

	if (agent.indexOf("Win") >= 0)
		return "\r\n"
	else
		if (agent.indexOf("Mac") >= 0)
			return "\r"

 	return "\r"

}

pagecode = 'import time'+nl+
	'import random'+nl+
	'import string'+nl+
	'import random'+nl+
	'import os'+nl+
	'import sys'+nl+
	'from multiprocessing import *'+nl+
	'import npyscreen'+nl+
	'from threading import *'+nl+
	'from selenium import webdriver'+nl+
	'from selenium.webdriver.chrome.options import Options'+nl+nl+
	'driverDirectory = \'/Users/michaelshum/Desktop/dumb_python_scripts/WebDrivers/chromedriver\' #Put the directory of the chromedriver here.'+nl+
	'url = \'https://skribbl.io/\''+nl+nl+
	'def chatupdate(queue):'+nl+
	'	chat = driver.find_element_by_xpath(\'//*[@id="boxMessages"]\').text'+nl+
	'	chatlist = chat.splitlines()'+nl+nl+
	'	queue.put([\'chat\',chatlist])'+nl+nl+
	'def chatSend(theString):'+nl+
	'	driver.find_element_by_xpath(\'//*[@id="inputChat"]\').send_keys(theString)'+nl+
	'	driver.find_element_by_xpath(\'//*[@id="inputChat"]\').submit()'+nl+nl+
	'def relogin():'+nl+
	'	driver.refresh()'+nl+
	'	time.sleep(1)'+nl+
	'	driver.find_element_by_xpath(\'//*[@id="formLogin"]/button[1]\').click()'+nl+
	'	time.sleep(4)'+nl+nl+
	'def randomString(stringLength):'+nl+
	'	lettersAndDigits = string.ascii_letters + string.digits'+nl+
	'	return \'\'.join(random.choice(lettersAndDigits) for i in range(stringLength))'+nl+nl+
	'def botrestart(queue):'+nl+
	'	driver.close()'+nl+
	'	driver.quit()'+nl+
	'	queue.put([i,\'Offline\',round(time.time())])'+nl+nl+
	'def botinit(queue):'+nl+
	'	global driver'+nl+
	'	chrome_options = Options()'+nl+
	'	chrome_options.add_argument("--headless")'+nl+
	'	chrome_options.add_argument("--mute-audio")'+nl+
	'	driver = webdriver.Chrome(executable_path=driverDirectory, chrome_options=chrome_options) #Change the directory to where your chromedriver is located.'+nl+
	'	driver.implicitly_wait(25) '+nl+
	'	queue.put([i,\'Initializing\',round(time.time())])'+nl+
	'	driver.get(url)'+nl+nl+
	'def botfunc(queue,num):'+nl+
	'	global driver'+nl+
	'	while True:'+nl+
	'		while True:'+nl+
	'			botinit(queue)'+nl+
	'			try:'+nl+
	'				driver.find_element_by_xpath(\'//*[@id="inputName"]\').send_keys(\'spamBot\') #Feel free to change the name.'+nl+
	'				time.sleep(1)'+nl+
	'				#driver.find_element_by_xpath(\'/html/body/div[2]/div/a[1]\').click()'+nl+
	'				driver.find_element_by_xpath(\'//*[@id="formLogin"]/button[1]\').click()'+nl+
	'			except:'+nl+
	'				botrestart(queue)'+nl+
	'				break'+nl+
	'			_time = round(time.time())'+nl+
	'			while True:'+nl+
	'					queue.put([i,\'Searching\',_time])'+nl+
	'					try:'+nl+
	'						time.sleep(5)'+nl+
	'						playerCount = (driver.find_element_by_xpath(\'//*[@id="containerGamePlayers"]\')).size[\'height\'] / 48'+nl+
	'						if playerCount > 1:'+nl+
	'							_time = round(time.time())'+nl+
	'							chatSend(\'Hey there. I am spamBot. I am here to make this game hell for you.\') #Feel free to change this line.'+nl+
	'							chatSend(\'Please enjoy hell with me! *If you copy me, you will probably get kicked.\') #Feel free to change this line.'+nl+
	'							time.sleep(2.5)'+nl+
	'							while True:'+nl+
	'								try:'+nl+
	'									try:'+nl+
	'										driver.find_element_by_xpath(\'//*[@id="containerPlayerlist"]/div[2]\').click()'+nl+
	'									except:'+nl+
	'										continue'+nl+
	'									chatSend(randomString(random.randint(1,99)))'+nl+
	'									#chatupdate(queue)'+nl+
	'									time.sleep(1)'+nl+
	'									playerCount = (driver.find_element_by_xpath(\'//*[@id="containerGamePlayers"]\')).size[\'height\'] / 48'+nl+
	'									queue.put([i,\'In game with {} players\'.format(playerCount),_time])'+nl+
	'									if playerCount < 2:'+nl+
	'										relogin()'+nl+
	'										queue.put([\'chat\',\'Disconnected\'])'+nl+
	'										break'+nl+
	'									if (driver.find_element_by_xpath(\'//*[@id="overlay"]/div\').get_attribute(\'style\') == "bottom: 0%;") and (driver.find_element_by_xpath(\'//*[@id="overlay"]/div/div[1]\').text == "Choose a word"):'+nl+
	'										chatSend("Sorry, I wasn\'t made to draw. I was made only to spam.")'+nl+
	'										time.sleep(0.2)'+nl+
	'										chatSend(\'Your terror with me is now over. Take care now!\')'+nl+
	'										relogin()'+nl+
	'										_time = round(time.time())'+nl+
	'										#queue.put([\'chat\',[\'Disconnected\']])'+nl+
	'										break'+nl+
	'								except:'+nl+
	'									relogin()'+nl+
	'									_time = round(time.time())'+nl+
	'									break'+nl+
	'						else: '+nl+
	'							relogin()'+nl+
	'					except:'+nl+
	'						botrestart(queue)'+nl+
	'						break'+nl+nl+
	'bots = []'+nl+nl+
	'q = Queue()'+nl+
	'parent, child = Pipe()'+nl+nl+
	'botCount = 8'+nl+nl+
	'for i in range(0,botCount):'+nl+
	'	b = Process(target=botfunc, name=\'Bot {}\'.format(i+1), args=(q,i,))'+nl+
	'	bots.append(\'Bot {}\'.format(i+1))'+nl+
	'	b.start()'+nl+
	'	time.sleep(0.75)'+nl+nl+
	'#GUI Stuff'+nl+nl+
	'def listening(conn):'+nl+
	'	statuses = []'+nl+
	'	chat = []'+nl+
	'	times = []'+nl+
	'	ingame = []'+nl+
	'	for i in range(0,botCount):'+nl+
	'		statuses.append(\'Offline\')'+nl+
	'		ingame.append(\'False\')'+nl+
	'		times.append(0.0)'+nl+
	'	while True:'+nl+
	'		recieve = q.get()'+nl+
	'		num = recieve[0]'+nl+
	'		if num == \'chat\':'+nl+
	'			chat = []'+nl+
	'			chat = recieve[1]'+nl+
	'			conn.send([chat,\'chat\'])'+nl+
	'		else:'+nl+
	'			line = recieve[1]'+nl+
	'			if \'In game\' in line:'+nl+
	'				_ingame = True'+nl+
	'			else:'+nl+
	'				_ingame = False'+nl+
	'			_time = recieve[2]'+nl+
	'			times[num] = _time'+nl+
	'			statuses[num] = line'+nl+
	'			ingame[num] = _ingame'+nl+
	'			conn.send([statuses,\'status\',times,ingame])'+nl+nl+
	'l = Process(target=listening, name=\'listening_process\', args=(child,))'+nl+
	'l.start()'+nl+nl+
	'class status(npyscreen.BoxTitle):'+nl+
	'	_contained_widget = npyscreen.SimpleGrid'+nl+
	'	entry_widget = npyscreen.SimpleGrid'+nl+nl+
	'class logs(npyscreen.BoxTitle):'+nl+
	'	_contained_widget = npyscreen.Pager'+nl+
	'	entry_widget = npyscreen.Pager'+nl+nl+
	'class choice(npyscreen.BoxTitle):'+nl+
	'	_contained_widget = npyscreen.MultiLineAction'+nl+
	'	entry_widget = npyscreen.MultiLineAction'+nl+nl+
	'class Form(npyscreen.Form):'+nl+
	'	def create(self):'+nl+
	'		rows, columns = os.popen(\'stty size\').read().split()'+nl+
	'		rows = int(rows)'+nl+
	'		columns = int(columns)'+nl+
	'		logsheight = -(rows-(botCount+5))'+nl+
	'		self.btstat = self.add(status, name=\'bot statuses\',editable=False,max_height=botCount+3)'+nl+
	'		self.choice = self.add(choice, name=\'choice\',editable=True,max_width=columns/12)'+nl+
	'		self.logs = self.add(logs, name=\'logs\',editable=False,relx=columns/12+2,rely=logsheight)'+nl+
	'	def valueupdate(self):'+nl+
	'		if recieved[1] == \'status\':'+nl+
	'			self.btstat.values = [[\'BOT NUMBER\', \'STATUS\', \'TIME IN STATUS\']]'+nl+
	'			for x in range(0,botCount):'+nl+
	'				row = []'+nl+
	'				times = recieved[2]'+nl+
	'				statuses = recieved[0]'+nl+
	'				row.append(bots[x])'+nl+
	'				row.append(statuses[x])'+nl+
	'				row.append(round(time.time())- times[x])'+nl+
	'				self.btstat.values.append(row)'+nl+
	'				ingame = recieved[3]'+nl+
	'			for x in range(0,botCount):'+nl+
	'				if (ingame[x] == True) and (bots[x] not in botsingame):'+nl+
	'					botsingame.append(bots[x])'+nl+
	'				elif (bots[x] in botsingame) and (ingame[x] == False):'+nl+
	'					botsingame.remove(bots[x])'+nl+
	'				botsingame.sort()'+nl+
	'		if recieved[1] == \'chat\':'+nl+
	'			self.logs.values = recieved[0]'+nl+
	'		elif \'Disconnected\' in recieved[2]:'+nl+
	'			self.logs.values = []'+nl+
	'		self.choice.values = botsingame'+nl+nl+
	'def guifunc(*args):'+nl+
	'	global botsingame'+nl+
	'	botsingame = []'+nl+
	'	gui = Form(name=\'skribbl.io - spamBot\')'+nl+
	'	while True:'+nl+
	'		global recieved'+nl+
	'		recieved = parent.recv()'+nl+
	'		gui.valueupdate()'+nl+
	'		gui.display()'+nl+nl+
	'print npyscreen.wrapper_basic(guifunc)'+nl+nl+
	'for bot in bots:'+nl+
	'	bot.join()'+nl+
	''

document.write(pagecode);

