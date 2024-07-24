import React, { useState, useEffect, useRef, useCallback, useLayoutEffect } from 'react';
import { VariablePopup } from './variablePopUp'; // Import the popup component
import type { CallLog, Mode, Source } from './recorderTypes';
import { CodeMirrorWrapper } from '@web/components/codeMirrorWrapper';
import { SplitView } from '@web/components/splitView';
import { TabbedPane } from '@web/components/tabbedPane';
import { Toolbar } from '@web/components/toolbar';
import { ToolbarButton, ToolbarSeparator } from '@web/components/toolbarButton';
import { CallLogView } from './callLog';
import './recorder.css';
import { asLocator } from '@isomorphic/locatorGenerators';
import { toggleTheme } from '@web/theme';
import { copy } from '@web/uiUtils';
import { VariablePopupProps } from './types'; // Import the types

declare global {
  interface Window {
    playwrightSetFileIfNeeded: (file: string) => void;
    playwrightSetSelector: (selector: string, focus?: boolean) => void;
    dispatch(data: any): Promise<void>;
  }
}

export interface RecorderProps {
  sources: Source[],
  paused: boolean,
  log: Map<string, CallLog>,
  mode: Mode,
}

export const Recorder: React.FC<RecorderProps> = ({
  sources,
  paused,
  log,
  mode,
}) => {
  const [fileId, setFileId] = useState<string | undefined>();
  const [selectedTab, setSelectedTab] = useState<string>('log');
  const [locator, setLocator] = useState('');
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [currentFillSelector, setCurrentFillSelector] = useState('');
  const [dynamicVariables, setDynamicVariables] = useState({});

  useEffect(() => {
    if (!fileId && sources.length > 0)
      setFileId(sources[0].id);
  }, [fileId, sources]);

  const source: Source = sources.find(s => s.id === fileId) || {
    id: 'default',
    isRecorded: false,
    text: '',
    language: 'javascript',
    label: '',
    highlight: []
  };
  
  window.playwrightSetSelector = (selector: string, focus?: boolean) => {
    const language = source.language;
    if (focus)
      setSelectedTab('locator');
    setLocator(asLocator(language, selector));
  };

  window.playwrightSetFileIfNeeded = (value: string) => {
    const newSource = sources.find(s => s.id === value);
    if (newSource && !newSource.isRecorded || !source.isRecorded)
      setFileId(value);
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    messagesEndRef.current?.scrollIntoView({ block: 'center', inline: 'nearest' });
  }, [messagesEndRef]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'F8':
          event.preventDefault();
          if (paused)
            window.dispatch({ event: 'resume' });
          else
            window.dispatch({ event: 'pause' });
          break;
        case 'F10':
          event.preventDefault();
          if (paused)
            window.dispatch({ event: 'step' });
          break;
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [paused]);

  const onEditorChange = useCallback((selector: string) => {
    if (mode === 'none')
      window.dispatch({ event: 'setMode', params: { mode: 'standby' } });
    setLocator(selector);
    window.dispatch({ event: 'selectorUpdated', params: { selector } });
  }, [mode]);

  const handleFill = (selector: string) => {
    setCurrentFillSelector(selector);
    setPopupVisible(true);
  };

  const handlePopupClose = () => {
    setPopupVisible(false);
  };

  const handlePopupSave = (variableName: string) => {
    setDynamicVariables((prevVariables) => ({
      ...prevVariables,
      [variableName]: currentFillSelector
    }));
    setPopupVisible(false);
    window.dispatch({ event: 'fillVariableAdded', params: { variableName, selector: currentFillSelector } });
  };

  return (
    <div className='recorder'>
      <Toolbar>
        <ToolbarButton icon='circle-large-filled' title='Record' toggled={mode === 'recording' || mode === 'recording-inspecting' || mode === 'assertingText' || mode === 'assertingVisibility'} onClick={() => {
          window.dispatch({ event: 'setMode', params: { mode: mode === 'none' || mode === 'standby' || mode === 'inspecting' ? 'recording' : 'standby' } });
        }}>Record</ToolbarButton>
        <ToolbarSeparator />
        <ToolbarButton icon='inspect' title='Pick locator' toggled={mode === 'inspecting' || mode === 'recording-inspecting'} onClick={() => {
          const newMode = {
            'inspecting': 'standby',
            'none': 'inspecting',
            'standby': 'inspecting',
            'recording': 'recording-inspecting',
            'recording-inspecting': 'recording',
            'assertingText': 'recording-inspecting',
            'assertingVisibility': 'recording-inspecting',
            'assertingValue': 'recording-inspecting',
          }[mode];
          window.dispatch({ event: 'setMode', params: { mode: newMode } }).catch(() => { });
        }}></ToolbarButton>
        <ToolbarButton icon='eye' title='Assert visibility' toggled={mode === 'assertingVisibility'} disabled={mode === 'none' || mode === 'standby' || mode === 'inspecting'} onClick={() => {
          window.dispatch({ event: 'setMode', params: { mode: mode === 'assertingVisibility' ? 'recording' : 'assertingVisibility' } });
        }}></ToolbarButton>
        <ToolbarButton icon='whole-word' title='Assert text' toggled={mode === 'assertingText'} disabled={mode === 'none' || mode === 'standby' || mode === 'inspecting'} onClick={() => {
          window.dispatch({ event: 'setMode', params: { mode: mode === 'assertingText' ? 'recording' : 'assertingText' } });
        }}></ToolbarButton>
        <ToolbarButton icon='symbol-constant' title='Assert value' toggled={mode === 'assertingValue'} disabled={mode === 'none' || mode === 'standby' || mode === 'inspecting'} onClick={() => {
          window.dispatch({ event: 'setMode', params: { mode: mode === 'assertingValue' ? 'recording' : 'assertingValue' } });
        }}></ToolbarButton>
        <ToolbarSeparator />
        <ToolbarButton icon='files' title='Copy' disabled={!source || !source.text} onClick={() => {
          copy(source.text);
        }}></ToolbarButton>
        <ToolbarButton icon='debug-continue' title='Resume (F8)' disabled={!paused} onClick={() => {
          window.dispatch({ event: 'resume' });
        }}></ToolbarButton>
        <ToolbarButton icon='debug-pause' title='Pause (F8)' disabled={paused} onClick={() => {
          window.dispatch({ event: 'pause' });
        }}></ToolbarButton>
        <ToolbarButton icon='debug-step-over' title='Step over (F10)' disabled={!paused} onClick={() => {
          window.dispatch({ event: 'step' });
        }}></ToolbarButton>
        <ToolbarSeparator />
        <ToolbarButton icon='wand' title='Toggle theme' onClick={() => {
          toggleTheme();
        }}></ToolbarButton>
      </Toolbar>
      <div className='recorder-content'>
        <SplitView sidebarSize={250}>
          <SplitView.Sidebar>
            <TabbedPane
              tabs={[
                { id: 'log', title: 'Log' },
                { id: 'source', title: 'Source' },
                { id: 'locator', title: 'Locator' },
              ]}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
            <div className='recorder-log'>
              <CallLogView log={log} />
              <div ref={messagesEndRef} />
            </div>
          </SplitView.Sidebar>
          <SplitView.Main>
            {selectedTab === 'log' && (
              <div className='recorder-log'>
                <CallLogView log={log} />
                <div ref={messagesEndRef} />
              </div>
            )}
            {selectedTab === 'source' && (
              <CodeMirrorWrapper
                value={source.text}
                language={source.language}
                onChange={(text) => window.dispatch({ event: 'sourceChanged', params: { text, id: fileId } })}
              />
            )}
            {selectedTab === 'locator' && (
              <div className='recorder-locator'>
                <CodeMirrorWrapper
                  value={locator}
                  language={source.language}
                  onChange={onEditorChange}
                />
              </div>
            )}
          </SplitView.Main>
        </SplitView>
      </div>
      {isPopupVisible && (
        <VariablePopup onClose={handlePopupClose} onSave={handlePopupSave} />
      )}
    </div>
  );
};
