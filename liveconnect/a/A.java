import java.applet.Applet;
import java.awt.Font;
import java.awt.GraphicsEnvironment;
import java.nio.charset.Charset;
import java.util.ArrayList;
@SuppressWarnings("serial")
public class A extends Applet {
	public byte[] b(String s, String c) throws Exception { return s.getBytes(c); }
	public String s(byte[] b, String c) throws Exception { return new String(b, c); }
	public Font[] f(){ return GraphicsEnvironment.getLocalGraphicsEnvironment().getAllFonts(); }
	public void t(long t) throws Exception { Thread.sleep(t); }
	public String[] c() {
		// http://www.ne.jp/asahi/hishidama/home/tech/java/string.html
		ArrayList<String> l = new ArrayList<String>();
		for (Charset c : Charset.availableCharsets().values()) {
			l.add(c.name());
			l.addAll(c.aliases());
		}
		return l.toArray(new String[0]);
	}
}
